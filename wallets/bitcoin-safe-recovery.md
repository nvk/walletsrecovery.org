---
title: Bitcoin Safe Recovery
---

## Description

Bitcoin Safe is a secure Bitcoin savings wallet designed for family use, emphasizing security and ease of use. Developed by Andreas Griffin, it provides comprehensive multisig wallet setup with step-by-step instructions and supports various hardware wallets. The wallet focuses on Bitcoin-only functionality with advanced features like encrypted cloud backup and label synchronization.

## History

- **Development**: Active development by Andreas Griffin
- **Platform Support**: Available on Windows, macOS, and Linux
- **Multisig Focus**: Specialized in secure multisignature wallet setup
- **Hardware Integration**: Extensive hardware wallet support
- **Language Support**: Multi-language interface including English, Chinese, Spanish, Japanese, Russian, Portuguese, Hindi, Arabic, Italian, French, German, and more

## Special Features

- **Easy Multisig Setup**: Step-by-step instructions for secure multisignature wallets
- **Hardware Wallet Support**: Compatible with Coldcard, Bitbox02, Trezor, Ledger, Jade, and others
- **PDF Backup Sheets**: Automated generation of backup documentation
- **Multi-language Support**: Available in 15+ languages
- **Transaction Management**: 
  - Transaction flow diagrams
  - Automatic coin selection within categories
  - One-click fee selection via mempool-blocks
- **Synchronization Features**:
  - Encrypted cloud backup via Nostr
  - Label synchronization between devices
  - Wallet chat and PSBT sharing
- **Advanced Features**:
  - Output descriptor support
  - PSBT (Partially Signed Bitcoin Transaction) support
  - WIF (Wallet Import Format) support
  - Electrum server syncing
  - Planned Compact Block Filters for Bitcoin Safe 2.0

## Recovery Information

### Supported Derivation Paths
- **BIP44**: `m/44'/0'/0'` (Legacy P2PKH)
- **BIP49**: `m/49'/0'/0'` (SegWit P2SH-P2WPKH)
- **BIP84**: `m/84'/0'/0'` (Native SegWit P2WPKH)
- **BIP48**: `m/48'/0'/0'/2'` (Multisig)
- **BIP86**: `m/86'/0'/0'` (Taproot P2TR)

### Recovery Process
1. **Seed Phrase Recovery**: Standard BIP39 seed phrase support
2. **Passphrase Support**: Optional BIP39 passphrase
3. **Multisig Recovery**: Support for multisignature wallet recovery
4. **Hardware Wallet Integration**: Seeds can be imported into supported hardware wallets
5. **Output Descriptor Recovery**: Advanced recovery using output descriptors

### External Recovery Tools
- **Electrum**: Compatible with Bitcoin Safe derivation paths
- **Sparrow Wallet**: Full compatibility including multisig support
- **BlueWallet**: Supports same derivation paths
- **Hardware Wallets**: Direct integration with supported hardware wallets
- **Bitcoin Core**: Can import via output descriptors

### Recovery Steps
1. Launch Bitcoin Safe application
2. Select "Restore Wallet" or "Import Wallet"
3. Choose wallet type (single-sig or multisig)
4. Enter seed phrase(s) for multisig wallets
5. Select derivation path
6. Optionally enter BIP39 passphrase
7. Configure hardware wallet integration if needed
8. Wait for blockchain synchronization

### Multisig Recovery
1. **Gather Signatures**: Collect required number of signatures
2. **Hardware Integration**: Connect supported hardware wallets
3. **PSBT Handling**: Use PSBT for secure transaction signing
4. **Backup Verification**: Verify PDF backup sheets
5. **Test Recovery**: Test with small amounts first

### Important Notes
- Bitcoin Safe is designed for Bitcoin-only use
- No seed generation on mainnet (security feature)
- Requires separate hardware signer for seed storage
- Update notifications and signature verification included
- Powered by Bitcoin Development Kit (BDK)
- Compact Block Filters planned for version 2.0

## Security Events

No major security incidents reported. Bitcoin Safe maintains strong security practices:
- No seed generation on mainnet
- Hardware wallet integration for secure key storage
- Encrypted cloud backup via Nostr
- Signature verification for updates
- Open-source development with community oversight
