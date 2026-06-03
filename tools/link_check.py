#!/usr/bin/env python3
"""Check local and external links in the static site.

The checker intentionally fails only on confirmed bad HTTP responses. Network
errors and bot-blocked responses can be noisy in CI, so they are reported as
warnings unless stricter flags are added later.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import html
from pathlib import Path
import re
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
SCAN_EXTENSIONS = {".html", ".md", ".json", ".js", ".css"}
SKIP_DIRS = {".git", "images", "node_modules", ".venv", "__pycache__"}
URL_RE = re.compile(r"https?://[^\s\"'<>\\)\]}]+")
ATTR_RE = re.compile(r"(?:href|src)=[\"']([^\"']+)[\"']", re.IGNORECASE)
MD_LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
TRAILING = ".,;:!?)]}>'\"`"


def load_ignores(path: Path) -> list[str]:
    if not path.exists():
        return []
    ignores: list[str] = []
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if line and not line.startswith("#"):
            ignores.append(line)
    return ignores


def ignored(value: str, patterns: list[str]) -> bool:
    return any(pattern in value for pattern in patterns)


def iter_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        rel_parts = path.relative_to(ROOT).parts
        if any(part in SKIP_DIRS for part in rel_parts):
            continue
        if path.suffix.lower() in SCAN_EXTENSIONS:
            files.append(path)
    return files


def clean_link(raw: str) -> str:
    value = html.unescape(raw.strip())
    while value and value[-1] in TRAILING:
        # Do not strip the closing paren from URLs that legitimately contain an
        # unmatched opening paren in the path.
        if value[-1] == ")" and value.count("(") > value.count(")"):
            break
        value = value[:-1]
    return value


def is_valid_http_url(value: str) -> bool:
    try:
        parsed = urllib.parse.urlsplit(value)
    except ValueError:
        return False
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return False
    if (parsed.hostname or "").lower() in {"localhost", "127.0.0.1", "::1"}:
        return False
    return True


def collect_links(files: list[Path], ignore_patterns: list[str]) -> tuple[dict[str, set[str]], list[tuple[Path, str]]]:
    external: dict[str, set[str]] = {}
    local: list[tuple[Path, str]] = []

    for path in files:
        text = path.read_text(errors="ignore")
        rel = str(path.relative_to(ROOT))

        for match in URL_RE.finditer(text):
            url = clean_link(match.group(0))
            if ignored(url, ignore_patterns) or not is_valid_http_url(url):
                continue
            external.setdefault(url, set()).add(rel)

        if path.suffix.lower() in {".html", ".md"}:
            for regex in (ATTR_RE, MD_LINK_RE):
                for match in regex.finditer(text):
                    link = clean_link(match.group(1))
                    if not link or ignored(link, ignore_patterns):
                        continue
                    if link.startswith(("http://", "https://")):
                        if is_valid_http_url(link):
                            external.setdefault(link, set()).add(rel)
                    else:
                        local.append((path, link))

    return external, local


def check_local_link(source: Path, link: str) -> tuple[str, str] | None:
    parsed = urllib.parse.urlsplit(link)
    if parsed.scheme in {"mailto", "tel", "javascript", "data"}:
        return None
    if not parsed.path or parsed.path.startswith("#"):
        return None

    if parsed.path.startswith("/"):
        target = ROOT / parsed.path.lstrip("/")
    else:
        target = (source.parent / urllib.parse.unquote(parsed.path)).resolve()

    if not str(target).startswith(str(ROOT)):
        return (link, "points outside repo")

    candidates = [target]
    if target.suffix == "":
        candidates.append(target / "index.html")

    if not any(candidate.exists() for candidate in candidates):
        return (link, f"missing from {source.relative_to(ROOT)}")
    return None


def request_url(url: str, timeout: int) -> tuple[str, int | None, str, str | None]:
    parsed = urllib.parse.urlsplit(url)
    clean = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path or "/", parsed.query, ""))
    headers = {
        "User-Agent": "walletsrecovery-link-check/1.0 (+https://walletsrecovery.org/)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    for method in ("HEAD", "GET"):
        request = urllib.request.Request(clean, headers=headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return (url, response.getcode(), response.geturl(), None)
        except urllib.error.HTTPError as exc:
            # Some sites disallow HEAD but allow GET.
            if method == "HEAD" and exc.code in {405, 403, 429, 500, 501, 503}:
                continue
            return (url, exc.code, clean, None)
        except Exception as exc:  # noqa: BLE001 - report network/system error text
            if method == "HEAD":
                continue
            return (url, None, clean, str(exc))

    return (url, None, clean, "unreachable")


def status_kind(code: int | None, error: str | None, allow_blocked: bool) -> str:
    if error:
        return "WARN"
    if code is None:
        return "WARN"
    if allow_blocked and code in {401, 403, 429}:
        return "WARN"
    if code >= 400:
        return "FAIL"
    if code >= 300:
        return "REDIRECT"
    return "OK"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--allow-blocked", action="store_true", help="treat 401/403/429 as warnings, not failures")
    parser.add_argument("--timeout", type=int, default=12)
    parser.add_argument("--workers", type=int, default=16)
    parser.add_argument("--ignore-file", default=".linkcheckignore")
    args = parser.parse_args()

    ignore_patterns = load_ignores(ROOT / args.ignore_file)
    files = iter_files()
    external, local = collect_links(files, ignore_patterns)

    failures: list[str] = []

    for source, link in local:
        result = check_local_link(source, link)
        if result:
            failures.append(f"LOCAL {source.relative_to(ROOT)} -> {result[0]} ({result[1]})")

    print(f"Scanned {len(files)} files, {len(external)} unique external URLs, {len(local)} local references")

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(request_url, url, args.timeout): url for url in sorted(external)}
        for future in concurrent.futures.as_completed(futures):
            url, code, final_url, error = future.result()
            kind = status_kind(code, error, args.allow_blocked)
            sources = ", ".join(sorted(external[url])[:4])
            suffix = f" error={error}" if error else ""
            if final_url and final_url != url and kind == "REDIRECT":
                suffix += f" -> {final_url}"
            line = f"{kind:8} {code or '-':>3} {url} [{sources}]{suffix}"
            if kind in {"FAIL", "WARN", "REDIRECT"}:
                print(line)
            if kind == "FAIL":
                failures.append(line)

    if failures:
        print("\nFailures:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("No confirmed broken links found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
