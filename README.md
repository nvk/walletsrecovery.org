# Wallets Recovery

**Giving users their seed phrase is not enough.**

Wallets Recovery is a static compatibility guide for Bitcoin wallet recovery. It tracks wallet defaults, derivation paths, BIP39/passphrase behavior, output descriptor support, PSBT support, and links to external recovery documentation.

Live site: https://walletsrecovery.org/

## Source of truth

Wallet data lives in [`walletsrecovery.json`](./walletsrecovery.json). The website renders the tables from that JSON at runtime.

Avoid duplicating the wallet tables in this README. Duplicates get stale quickly; update the JSON instead.

## What the status icons mean

The current icon legend is maintained in `walletsrecovery.json` under `icons` and rendered on the site. In short:

- ✅ documented recovery information
- ⚠️ known but weak/unofficial recovery documentation
- ☠️ unavailable, proprietary, or too complex for average external recovery
- 😵 discontinued / no longer maintained
- 👁 privacy concern
- ⑂ validation concern
- 🚸 physical hardware risk without passphrase/multisig
- ⛔️ Lightning/channel-state caveat
- 🧐 newer team/product with less than five years of public history

## Editing wallet data

Each wallet entry includes:

- `status` — string of status icons
- `name` and `url`
- `derivation` — booleans for common paths (`bip44`, `bip49`, `bip84`, `bip48`, `bip86`, `brd`) plus optional `custom`
- `output_descriptor`
- `bip39_pass` / `passphrase`
- `wif_support` where applicable
- `bip174_psbt`
- `notes` — structured links and explanatory text
- optional `availability` and `last_verified`

When updating wallet data, prefer current primary sources: official product pages, official docs, project repositories, or maintainer announcements.

## Develop locally

This site is hosted on GitHub Pages and can be served as static files.

```bash
python3 -m http.server 8002
# open http://localhost:8002
```

Or use the helper:

```bash
./serve.sh
```

## Validate changes

```bash
python3 -m json.tool walletsrecovery.json >/dev/null
node --check scripts.js
python3 tools/link_check.py --allow-blocked
```

`tools/link_check.py` checks local HTML/Markdown/JSON/JS/CSS links and treats confirmed 4xx/5xx responses as failures. Bot-blocked responses such as 401/403/429 are warnings when `--allow-blocked` is used.

## Contributing

Open a pull request against https://github.com/nvk/walletsrecovery.org. Include source links for any wallet behavior or availability change.
