---
title: Bitcoin Safe Recovery
reviewed: 2026-06-02
---

## Description

Bitcoin Safe is an open-source desktop Bitcoin savings wallet by Andreas Griffin for Windows, macOS, and Linux. It is focused on singlesig and multisig cold-storage management with hardware signers rather than software-held mainnet seeds.

## Current Status

- **Platforms:** Windows, macOS, Linux.
- **Signer model:** hardware signers required for safe seed storage on mainnet.
- **Current hardware coverage:** official materials list COLDCARD Mk4, COLDCARD Mk5, COLDCARD Q, BitBox02 / BitBox02 Nova, Foundation Passport, Jade / Jade Plus, Keystone, Krux, Ledger Nano models, SeedSigner, Specter DIY, and Trezor Safe models.
- **Sync options:** Electrum/Esplora servers and Compact Block Filters.
- **Interoperability:** descriptors, PSBT import/export/sharing, QR/USB/SD-card signer workflows, and BIP329 label import/export.

## Recovery Information

### Recovery Materials to Preserve

1. Every signer seed backup and passphrase, if used.
2. The Bitcoin Safe backup PDF, especially the wallet descriptor and cosigner details.
3. Labels/metadata backups if you rely on them for UTXO categories.
4. For multisig wallets: all cosigner xpubs, script policy, quorum, derivation paths, and address type.

### Supported Recovery Patterns

- **Output descriptors:** backup PDFs include descriptor data; descriptors can be imported into descriptor-aware tools such as Bitcoin Core or Sparrow.
- **PSBT workflows:** transactions can be moved between participants/signers with PSBT files, QR, USB, SD card, and collaboration plugins.
- **Hardware-wallet recovery:** if a signer fails, restore that signer's seed/passphrase on compatible replacement hardware, then re-open the saved descriptor/policy in Bitcoin Safe or another compatible coordinator.
- **Blockchain scanning:** use Electrum/Esplora for faster setup or Compact Block Filters for improved privacy.

### Common Derivation Paths

Bitcoin Safe coordinates hardware signers, so the exact path depends on the signer and wallet policy. Common paths include:

- **BIP84 singlesig:** `m/84'/0'/0'`
- **BIP48 multisig:** `m/48'/0'/0'/2'`
- **BIP86 Taproot:** `m/86'/0'/0'` when supported by the signer/policy

## Important Notes

- Do not treat the Bitcoin Safe app data alone as a recovery backup. Keep signer seeds/passphrases and wallet descriptors separately.
- For multisig, a seed phrase without the multisig descriptor/policy may not be enough to locate funds quickly.
- Test recovery with a small amount before relying on a new multisig setup.

## Security Events

No major public wallet-level recovery incident was found during the 2026-06-02 review. Continue to verify releases, keep descriptor backups, and confirm addresses on the hardware signer.

## Sources

- https://bitcoin-safe.org/en/
- https://bitcoin-safe.org/en/features/readme/
- https://bitcoin-safe.org/en/knowledge/compact-block-filters/
- https://github.com/andreasgriffin/bitcoin-safe
