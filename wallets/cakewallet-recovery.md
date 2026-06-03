---
title: CakeWallet Recovery
reviewed: 2026-06-02
---

## Description

Cake Wallet is a non-custodial, open-source multi-currency wallet. Current official docs list Android, iOS, macOS, Linux, and Windows installation paths.

## Current Status

- **Platforms:** Android, iOS, macOS, Linux, Windows.
- **Bitcoin seed format:** official Bitcoin docs say Cake Wallet generates BIP39 seeds by default and can restore legacy Electrum-style seed phrases when needed.
- **Bitcoin address support:** docs list SegWit, Taproot, SegWit-compatible, Legacy, Silent Payments, and other Bitcoin receive address types.
- **Cupcake:** Cake-family app focused on turning old phones into offline security devices; official docs currently list Bitcoin and Monero support.

## Recovery Information

### Bitcoin Recovery Basics

1. Install Cake Wallet from an official source.
2. Choose **Restore existing wallet**.
3. Select the wallet type/asset you are restoring.
4. Enter the seed phrase or keys exactly as backed up.
5. Use the correct seed type and restore date/blockheight where the asset requires it.
6. Let the wallet finish synchronization before assuming funds are missing.

### Bitcoin Derivation Notes

Cake's Bitcoin docs currently state:

- **BIP39 default:** `m/84'/0'/0`
- **Legacy Electrum-style restore:** `m/0'`

Because Cake supports multiple Bitcoin address types, users recovering outside Cake should verify the exact script/address type used by the original wallet before concluding funds are absent.

### External Recovery Tools

For Bitcoin-only recovery, try descriptor/path-aware wallets such as Sparrow, Electrum, BlueWallet, or Bitcoin Core. Confirm the seed type, address type, and derivation path before sweeping or moving funds.

## Important Notes

- Cake Wallet is non-custodial; seed/key backups are the recovery authority.
- Different assets in Cake can use different seed/key formats and restore parameters.
- Never share seed phrases or keys with support accounts, recovery services, or strangers.
- Test any migration or external restore with a small amount first.

## Security Events

No major public wallet-level recovery incident was found during the 2026-06-02 review. Users should still verify downloads, keep offline seed backups, and consult official docs for asset-specific restore steps.

## Sources

- https://docs.cakewallet.com/get-started/
- https://docs.cakewallet.com/cryptos/bitcoin/
- https://docs.cakewallet.com/get-started/setup/restore-existing-wallet
- https://docs.cakewallet.com/features/advanced/seed-keys
- https://docs.cakewallet.com/cupcake/getting-started
