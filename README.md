# Wallets Recovery [Beta]


**Giving users their seed phrase is not enough.**

While great advances have been made in interoperability and recoverability, developers across the industry continue to build wallets that either:
+ Don't implement BIP standard(s).
+ Implement a BIP standard, but inconsistently when compared with other wallets.
+ Implement a BIP standard, but one that has not been widely adopted (and perhaps only by them).
+ Don't have clear documentation about their derivation paths, backup and recovery processes.

This list is meant to gather information about wallet defaults for external recovery. Wallets come and go, information gets lost and users are left with tears. Responsible wallet makers document external recovery. Users should not have to read or dig through the source code to figure out the Derivation Paths or Redeem Scripts.

If we went to your website and couldn't find it => ☠️☠️☠️ [EXTERNAL RECOVERY NOT DOCUMENTED].

**This list is not an endorsement of the security or the quality of any of the wallets.**

Status|Hardware Wallets|Supported Paths|BIP39 Pass|BIP174 PSBT|Note
:---:|:---|:---:|---|---|---
✅|BitBox01[↗︎](https://shiftcrypto.ch/bitbox01/)|`m/44'`\|`49'`\|`84'/0'/0'`|Required|No|[Docs](https://shiftcrypto.ch/bitbox01/wallet-sweep/), [Recovery Tool](https://github.com/digitalbitbox/html_backup)|
🛑|BitBox02[↗︎](https://shiftcrypto.ch/bitbox02/)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|No|[EXTERNAL RECOVERY NOT DOCUMENTED]|
✅|ColdCard Mk1[↗︎](https://coldcardwallet.com/)|`m/44'`\|`49'`\|`84'/0'/0'` + Custom|Optional|Yes|[Docs](https://coldcardwallet.com/docs/)
✅|ColdCard Mk2[↗︎](https://coldcardwallet.com/)|`m/44'`\|`49'`\|`84'/0'/0'` + Custom|Optional|Yes|[Docs](https://coldcardwallet.com/docs/)
✅|ColdCard Mk3[↗︎](https://coldcardwallet.com/)|`m/44'`\|`49'`\|`84'/0'/0'` + Custom|Optional|Yes|[Docs](https://coldcardwallet.com/docs/)
✅|Ledger Nano[↗︎](https://ledger.com/)|`m/44'/0'/0'`|Optional|No|[Docs](https://support.ledger.com/hc/en-us)
✅|Ledger S[↗︎](https://ledger.com/)|`m/44'/0'/0'`|Optional|No|[Docs](https://support.ledger.com/hc/en-us)
✅|Trezor One[↗︎](https://trezor.com)|`m/44'`\|`49'/0'/0'`|Optional|No|[Docs](https://wiki.trezor.io)
✅|Trezor Model T[↗︎](https://trezor.com)|`m/44'`\|`49'/0'/0'`|Optional|No|[Docs](https://wiki.trezor.io)
✅|KeepKey[↗︎](https://keepkey.zendesk.com/hc/en-us)|`m/44'/0'/0'`|Optional|No|[Docs](https://keepkey.zendesk.com/hc/en-us/articles/360001449050-How-to-Recover-on-your-KeepKey), [xPub](https://keepkey.zendesk.com/hc/en-us/sections/360000520290-Software), [Compatible Wallets](https://keepkey.zendesk.com/hc/en-us/articles/360001279444-What-Type-of-Wallet-Can-be-Used-to-Recover-KeepKey-)|
✅|Opendime[↗︎](https://opendime.com)|WIF|N/A|N/A|[Docs](https://opendime.com/faq), [Archive](https://web.archive.org/save/https://opendime.com/faq)

Status|Software Wallet|Path and/or Script|BIP39 Pass|WIF Support|BIP174 PSBT|Note
:---:|:---|:---:|---|---|---|---
️⚠️|Bitcoin Core[↗︎](https://bitcoin.org)|`m/0'/0'`|N/A||WIP|[Github Issue](https://github.com/bitcoin/bitcoin/issues/13302)
✅|Bitcoin Wallet app[↗︎](https://github.com/bitcoin-wallet/bitcoin-wallet)|BIP32 non 44 Compatible|||No|[Docs](https://github.com/bitcoin-wallet/bitcoin-wallet/blob/master/wallet/README.recover.md), [Archive](./recovery-docs/bitcoinwallet-recovery.md)
️⚠️|Bisq[↗︎](https://bisq.network/)|`m/44'/0'/0'`|N/A||No|[Github Issue](https://github.com/bisq-network/bisq/issues/1853)
⚠️|Bither[↗︎](https://bither.net/)|`m/44'`\|`49'/0'/0'`|||No|[EXTERNAL RECOVERY NOT DOCUMENTED]
✅|Blockchain.com[↗︎](https://www.blockchain.com/en/wallet)|`m/44'/0'/n'`|||No|[Docs](https://support.blockchain.com/hc/en-us/articles/115001298143-Your-Recovery-Phrase-The-Failsafe), [xPub](https://support.blockchain.com/hc/en-us/articles/207746403-Wallets-Addresses)
✅|Blockstream Green (GreenAddress)[↗︎](https://blockstream.com/green/)|Custom 2-of-2 Script|Optional (on restore)||No|[Recovery tool](https://github.com/greenaddress/garecovery)
✅|BlueWallet[↗︎](https://bluewallet.io/)|`m/44'`\|`m/49'`\|`84'/0'/0'`|||WIP|[Docs](http://help.bluewallet.io/en/articles/2847190-how-to-backup-export-and-import-your-wallet), [Archive](https://web.archive.org/save/http://help.bluewallet.io/en/articles/2847190-how-to-backup-export-and-import-your-wallet), [Features](https://bluewallet.io/features.html)
️⚠️|BRD (Bread Wallet)[↗︎](https://brd.com/)|`m/0'`|N/A||No|[Github Issue](https://github.com/voisine/breadwallet-ios/issues/131), [Reddit Post](https://www.reddit.com/r/Bitcoin/comments/6btevz/how_do_i_import_my_12_breadwallet_seed_words_into/)
⚠️|BTC.com app[↗︎](https://btc.com/applications/app)|Multisig: `m/0'`|||No|[Unofficial Docs](https://gist.github.com/rubensayshi/da922774d43976e0804c)
⚠️|Casa Keymaster[↗︎](https://keys.casa/keymaster/)|`m/49/0/X` (X increments with each key rotation)|||No|[Unofficial Docs](./recovery-docs/casakeymaster-recovery.md)
⚠️|Coin Wallet[↗︎](https://www.coin.space/)|`m/0'`|||No|[EXTERNAL RECOVERY NOT DOCUMENTED]
✅|Coinomi[↗︎](https://www.coinomi.com)|`m/44'`\|`49'`\|`84'/0'/0'`|||No|[Export](https://coinomi.freshdesk.com/support/solutions/articles/29000009717-what-is-the-recovery-tool-and-how-do-i-export-my-private-keys-), [Import](https://coinomi.freshdesk.com/support/solutions/articles/29000009715-how-to-import-a-coinomi-seed-into-electrum-)
✅|Copay[↗︎](https://copay.io/)|Single Signer: ≥ v1.2 `m/44/0'/0'` Multisig: < v1.2 `m/45'/2147483647/0/x` `m/45'/2147483647/1/y` ≥ v1.2 `m/44/0'/0'` ≥ v1.5 `m/48'/0'/0'/1'` `m/48'/0'/0'/2'`|Optional||No|[Docs](https://github.com/bitpay/copay#wallet-export-format), [Recovery tool](https://bitpay.github.io/copay-recovery/), ❌[Endangered users by misrepresenting Bitcoin](https://web.archive.org/web/20170817153138/https://blog.bitpay.com/bitcore-segwit-activation/)
✅|Edge Wallet[↗︎](https://edge.app/)|`m/44'`\|`49'/0'/0'`|||No|[Docs](https://support.edge.app/support/solutions/articles/8000080183-edge-private-seeds-derivation-and-export)
✅|Electrum[↗︎](https://electrum.org)|Single Signer: `m/44'`\|`49'`\|`84/0'/0'` Multisig: `m/45'/0/0/0` `m/48'/0'/0'/1'` `m/48'/0'/0'/2'` [Does not use BIP39 seed phrases](https://electrum.readthedocs.io/en/latest/seedphrase.html) but can import them|Optional||Yes|[Docs](https://electrum.readthedocs.io)
✅|Exodus[↗︎](https://exodus.io)|`m/44'`\|`84/0'/0'`|||No|[Docs](https://support.exodus.io/article/159-import-your-bitcoin-wallet-into-electrum)
✅|Hodl Wallet[↗︎](https://hodlwallet.com)|`m/0'`|N/A||No|[Docs iOS](https://github.com/hodlwallet/hodl-wallet-ios/blob/master/README.md), [Docs Android](https://github.com/hodlwallet/hodl-wallet-android/blob/master/README.md)
⚠️|Jaxx Liberty[↗︎](https://jaxx.io/downloads)|`m/44'/0'/0'`|||No|[EXTERNAL RECOVERY NOT DOCUMENTED]
✅|JoinMarket[↗︎](https://github.com/JoinMarket-Org/joinmarket-clientserver)|`m/49'/0'/n'`|Optional||No|[Docs](https://github.com/JoinMarket-Org/joinmarket-clientserver/blob/master/docs/USAGE.md#recover)
✅|Ledger Live[↗︎](https://shop.ledger.com/pages/ledger-live)|`m/44'`\|`49'/0'/0'`|||No|[Docs](https://support.ledger.com/hc/en-us/articles/360006444193)
✅|KeepKey Client[↗︎](https://chrome.google.com/webstore/detail/keepkey-client/idgiipeogajjpkgheijapngmlbohdhjg)|`m/44'/0'/0'`|Optional||No|[Docs](https://keepkey.zendesk.com/hc/en-us/articles/360001449050-How-to-Recover-on-your-KeepKey), [xPub](https://keepkey.zendesk.com/hc/en-us/sections/360000520290-Software), [Compatible Wallets](https://keepkey.zendesk.com/hc/en-us/articles/360001279444-What-Type-of-Wallet-Can-be-Used-to-Recover-KeepKey-)|
⚠|Multibit HD[↗︎](https://multibit.org/)|`m/0'`|N/A||No|[Github Issue](https://github.com/Multibit-Legacy/multibit-hd/issues/445)
✅|Mycelium[↗︎](https://wallet.mycelium.com/)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional (on restore)||No|[Docs](https://mycelium-support.zendesk.com/hc/en-us/articles/115003713872-Hierarchical-Deterministic-Wallets), [Github Issue](https://github.com/mycelium-com/wallet-android/issues/483)
✅|OpenBazaar[↗︎](https://openbazaar.org/)|`m/44'/0'`\|`1'`\|`133'`\|`145'/0'`|||No|[Docs](https://openbazaar.zendesk.com/hc/en-us/articles/360002820331-How-do-I-restore-OpenBazaar-from-a-mnemonic-seed-)
⚠️|Rise Wallet[↗︎](https://www.risewallet.com/)|`m/49'/0'/0'`|||No|[EXTERNAL RECOVERY NOT DOCUMENTED]
✅|Samourai[↗︎](https://samouraiwallet.com/)|Deposit: `m/44'`\|`49'`\|`84'`\|`47'/0'/0'`Post Mix: `m/84'/0'/2147483646'`|Required||WIP|[Docs](https://support.samourai.io/article/46-reveal-all-individual-private-keys-in-the-wallet), [BIPs Supported](https://samouraiwallet.com/bips)
✅|Trezor Web Wallet[↗︎](https://wallet.trezor.io)|`m/44'`\|`49'/0'/0'`|Optional||No|[Docs](https://wiki.trezor.io)
⚠️|Unchained Capital[↗︎](https://www.unchained-capital.com/)|`m/45’/0’/0’/0/0` + Redeem Script|||No|[Docs](https://www.unchained-capital.com/faq/), [Archive](https://web.archive.org/web/20190630224057/https://www.unchained-capital.com/faq/), [**Script 404**](https://github.com/unchained-capital/bitcoin-multisig)
✅|Wasabi[↗︎](https://docs.wasabiwallet.io/)|`m/84'/0'/0'` Very Deep Depths|Optional||Yes|[Docs](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-derivation-paths-does-wasabi-use), [BIPs Supported](https://docs.wasabiwallet.io/using-wasabi/BIP.html)

Status|Lightning Wallet|Path and/or Script|Passphrase|Note
:---:|:---|:---:|---|---|---
✅|BLW (Bitcoin Lightning Wallet)[↗︎](https://lightning-wallet.com/)|`m/84'/0'/0'` BIP32 non 44 Compatible|N/A|[Docs](https://lightning-wallet.com/recovering-lost-balance)
⚠️|c-Lightning[↗︎](https://github.com/ElementsProject/lightning)|`m/84'`\|`141'/0'/0'/`Keys derived from `hsm_secret` file|N/A|[BIP32 layout explained](https://github.com/ElementsProject/lightning/blob/697b501132c4222da444f6c63f35818169292efb/hsmd/hsmd.c#L426-L445), [xPriv/xPub Export Tool](https://github.com/rsbondi/clightning-go-plugin/tree/master/dump_keys)
✅|Eclair Mobile[↗︎](https://github.com/ACINQ/eclair-mobile)|`m/49'/0'/0'`|Optional|[Docs](https://github.com/ACINQ/eclair-mobile/wiki/FAQ#can-i-restore-my-seed-on-another-bitcoin-wallet-)
✅|LND (Lightning Network Daemon)[↗︎](https://github.com/lightningnetwork/lnd)|aezeed|Optional|[Docs](https://github.com/lightningnetwork/lnd/tree/master/aezeed)

Status|Combo HW+SW|Path and/or Script|BIP39 Pass|BIP174 PSBT|Note
:---:|:---|:---:|---|---|---|---
✅|BTCPay Server (Coldcard)[↗︎](https://coldcardwallet.com)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|Yes|[Docs](https://docs.btcpayserver.org/getting-started/connectwallet/coldcardwallet#coldcard-wallet-setup)
✅|Electrum (Coldcard)[↗︎](https://coldcardwallet.com/)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|Yes|[Docs](https://coldcardwallet.com/docs/quick)
✅|Electrum (Ledger S/Nano)[↗︎](https://ledger.com/)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|No|[Docs](https://support.ledger.com/hc/en-us)
✅|Electrum (KeepKey)[↗︎](https://shapeshift.io/keepkey/)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|No|[Docs](https://keepkey.zendesk.com/hc/en-us/articles/360001449050-How-to-Recover-on-your-KeepKey), [xPub](https://keepkey.zendesk.com/hc/en-us/sections/360000520290-Software), [Compatible Wallets](https://keepkey.zendesk.com/hc/en-us/articles/360001279444-What-Type-of-Wallet-Can-be-Used-to-Recover-KeepKey-)|
✅|Electrum (Trezor One / Model T)[↗︎](https://trezor.com)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|No|[Docs](https://wiki.trezor.io)
✅|Wasabi (Coldcard)[↗︎](https://coldcardwallet.com)|`m/44'`\|`49'`\|`84'/0'/0'`|Optional|Yes|[Docs](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#how-can-i-generate-a-wasabi-skeleton-wallet-file-in-coldcard)

Notes:
- Hardware wallets don't care about derivation in certain modes.
- Wallets which have been frequently exploited, or which have endangered users by misrepresenting forked coins as if they are Bitcoin, may only be included with a warning.

Icon|Legend
:---:|---
🛑|Unknown. No obvious docs, research in progress
☠️|Not publicly available, or complex without a external tool available for the average user
⚠️|Known, but unofficially documented
✅|Documented + Link to doc

---



## Explainer: Wallet Types

+ [**Paper wallets**](https://en.bitcoin.it/wiki/Paper_wallet) are not actually wallets, but rather private keys and addresses printed out on paper. While the keys and addresses can technically be generated non-deterministically or deterministically, the usability is basically the same or poorer than a non-deterministic software wallet. Paper wallets have a number of significant drawbacks, including encouraging address reuse, exposing keys to poorly secured networked devices (printer), and not handling change addresses. Paper wallets should not be confused with [recovery seeds](https://wiki.trezor.io/Recovery_seed).
+ **Non-deterministic wallets** randomly generate all private / public key pairs independent of each other. A [keypool buffer](https://en.bitcoin.it/wiki/Key_pool) was added to the Bitcoin-Qt / Bitcoin Core wallet in [October](https://bitcointalk.org/index.php?topic=1414.0) [2010](https://bitcointalk.org/index.php?topic=1528.0), which allowed the wallet to create a collection of unused addresses, rather than generating new addresses one by one upon use. While this feature allowed for less frequent backups than before, the non-determinism still carried the risk of key loss if the pool was exhausted and a new key was generated beyond what was saved in backup.
+ **Deterministic wallets** are essentially any wallet where "[you can backup once... because all future addresses are determined in advance](https://bitcointalk.org/index.php?topic=19137.msg239768#msg239768)," which was a massive improvement in recoverability. There are [two different forms](https://bitcoin.stackexchange.com/questions/18102/does-a-wallet-containing-multiple-addresses-have-a-single-private-key):
   + **Sequential deterministic wallets** take a single seed phrase / passphrase and repeatedly increment it in order to generate new keypairs. This meant that the system would only need to store addresses, and then re-generate the private keys when needed.
   + **Hierarchical deterministic wallets** take a single seed phrase and randomly generate a master private / public key pair, which is then used to derive child key pairs that generate addresses. This system allows for the generation of addresses to occur without the master private key, with only the public key.
+ **Multi-signature wallets** require multiple signatures or parties to sign a transaction in order to spend bitcoin. An M-of-N [BIP11](https://github.com/bitcoin/bips/blob/master/bip-0011.mediawiki) address must first be generated in order to receive bitcoin for spending in multi-signature transactions. While the 2-of-2 and 2-of-3 schemes are the most common, the [maximum number of public keys](https://bitcoin.stackexchange.com/questions/81223/why-is-20-the-maximum-public-keys-in-a-multisig-transaction) is higher, and this could increase much more in the future [with Schnorr signatures](https://twitter.com/J9Roem/status/991098233828139008) and [Taproot](https://bitcoinops.org/en/newsletters/2019/05/14/). 'Partially Signed Bitcoin Transactions' (PSBT) according to [BIP174](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki) (proposed), where unsigned or partially signed transactions are passed around to multiple signers or signing devices, may also be an option.


## Explainer: Derivation Paths

In hierarchical deterministic wallets ([BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)), a derivation path is a sequence of fields or levels through which a wallet organizes coins in a multi-currency, multi-account, and multi-address system. According to [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki), this hierarchy consists of five levels, in addition to the master extended private key ('xpriv') represented by `m` (alternatively, derivation paths for the master extended public key or 'xpub' use `M`). Double-check what fields your wallet uses in our chart above, as BIP44 has been implemented inconsistently!

m / purpose' / coin_type' / account' / change / address_index

+ **Purpose:** This field, which was added through [BIP43](https://github.com/bitcoin/bips/blob/master/bip-0043.mediawiki), indicates which standard the derivation path follows. Possibilities include `0` or `44` referring to the default [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) P2PKH / '1' legacy addresses, `45` referring to [BIP45](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki) P2SH multi-party multi-signature wallets (proposed), `47` referring to [BIP47](https://github.com/bitcoin/bips/blob/master/bip-0047.mediawiki) reusable payment codes (draft), `48` referring to hardware multisignature wallets (no BIP or standard proposal), `49` referring to [BIP49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki) P2WPKH-nested-in-P2SH / '3' SegWit addresses, or `84` referring to [BIP84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) P2WPKH / 'bc1' native SegWit addresses. Some wallet services are supporting more than one (as in, they can display both legacy and SegWit addresses derived from the same seed phrase).
+ **Coin Type:** This field indicates which cryptocurrency is being used in a multi-currency wallet. All coins, including testnet bitcoin, are assigned [a constant number](https://github.com/satoshilabs/slips/blob/master/slip-0044.md). For example, a derivation path for a Monero (XMR) account would be `m/44'/128'`. *Note that if finalized, BIP45 would designate this level as the 'Cosigner Index' instead.*
+ **Account:** This field, in a multi-account wallet, indicates the identity or collection of addresses, which allows users to segregate funds for different things (ex. savings, donations). *Note that if finalized, BIP45 would not include this field. If BIP47 is finalized, this level would be designated as 'Identity', though it is equivalent to 'Account.'*
+ **Change:** This field, if the constant `0` is present, indicates "external chain" (regular) addresses; if the constant `1`, indicates "internal chain" (change) addresses. *Note that if finalized, BIP47 would designate this level as space for the notification keys and ephemeral payment codes.*
+ **Address Index:** This field indicates the specific address number in a sequence, within an account.

Note that the sequential fields, 'Account' and 'Address Index', start at zero (0). Remember how the first / ground floor of a building is level zero in the U.K. and Europe? Accounts and addresses are numbered starting from zero too.

Practical Example: A user has a **BIP44** compliant **bitcoin** wallet, and wants to locate the **second** change address in their **third** account. The derivation path for the **second change address** in the **third account** would look like this: `m/44'/0'/2'/1/1`.

The meaning of "public" / unhardened versus hardened derivation, indicated in the fields by apostrophes, is explained [here](https://wiki.trezor.io/Hardened_and_non-hardened_derivation), [here](https://medium.com/@sevcsik/working-with-bitcoin-hd-wallets-ii-deriving-public-keys-c48341629388), and [here](https://bitcoin.stackexchange.com/questions/62533/key-derivation-in-hd-wallets-using-the-extended-private-key-vs-hardened-derivati?rq=1).

---


Did we get it wrong? Just let us know, and this will be updated. :)

Want to contribute, make a [Pull Request](https://github.com/nvk/wallets-recovery/pulls).
