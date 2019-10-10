# Casa Key Shield recovery

How to recover funds from a 3-of-5 Casa Bitcoin Wallet without using Casa software or servers.

Install the latest version of Electrum: https://electrum.org/#download.

NOTE: Electrum can be finicky with hardware signing device support, especially on Linux. In order to prevent errors, ensure that you only have ONE Electrum instance running and make sure ALL your hardware devices are plugged in rather than plugging and unplugging the devices as you sign.

## Linux Only

Install the appropriate libraries for your hardware wallets:

1. `sudo apt-get install libusb-1.0-0-dev libudev-dev`
2. `sudo pip3 install btchip-python`
3. `sudo pip3 install trezor`
4. Set udev rules for ledger: https://support.ledgerwallet.com/hc/en-us/articles/115005165269-Fix-connection-issues
5. Set udev rules for trezor: https://doc.satoshilabs.com/trezor-user/settingupchromeonlinux.html
6. After setting the udev rules for the first time, reboot your computer.

## Step-By-Step Guide

1. Run electrum. For testnet, run `electrum --testnet`.
2. Create a new wallet and give it a name.
3. Choose "multi-signature wallet".
4. Select "From 5 cosigners".
5. Select "Require 3 signatures".
6. Click next.

### For cosigner 1 of 5:

1. Choose "hardware wallet".
2. Plug in hardware device 1 if it isn't already plugged in.
3. Click next.
4. Select your hardware device and click next.
5. Select p2sh-segwit multisig.
   - The derivation path should change to something like: `m/48'/0'/0'/1'`. Replace it with the derivation path from your recovery data, which will look something like: `m/49/0/0`.
6. Click next, then next again on the master public key screen.

### For cosigner 2 of 5:

1. Choose "cosign with hardware device".
2. Plug in hardware device 2 if it isn't already plugged in.
3. Click next.
4. Select your hardware device and click next.
5. Select p2sh-segwit multisig.
   - The derivation path should change to something like: `m/48'/1'/0'/1'`. Replace it with the derivation path from your recovery data.
6. Click next.

### For cosigner 3 of 5:

1. Choose "cosign with hardware device".
2. Plug in hardware device 3 if it isn't already plugged in.
3. Click next.
4. Select your hardware device and click next.
5. Select p2sh-segwit multisig.
   - The derivation path should change to something like `m/48'/1'/0'/1'`. Replace it with the derivation path from your recovery data.
6. Click next.

### For cosigner 4 of 5:

1. Choose "Enter cosigner key" and click next.
2. Paste the "Mobile Device Key" for the appropriate account from your recovery data.
3. Click next.

### For cosigner 5 of 5:

1. Choose "Enter cosigner key" and click next.
2. Paste the "Recovery Device Key" for the appropriate account from your recovery data.
3. Click next.
4. On the password screen, leave both fields blank and click next.

Electrum will now initialize your wallet and display all of the transactions that have been received and sent by it. If you don't see your transactions show up after a minute or so, something went wrong during the process and Electrum derived the wrong set of addresses.

To send your assets to a new wallet, click on the "send" tab and fill in the "pay to" field with and address owned by your new wallet. Click the "max" button to sweep all of the value out of the wallet, and slide the "fee" bar to an appropriate fee depending upon your urgency.

Once you click "send" you will be prompted to confirm the amount and destination address on each hardware device.

Upon completing the third signature, the "broadcast" button will no longer be greyed out. Click "broadcast" and then copy the transaction id into a block explorer to check that the transaction has propagated across the network.

# Casa Basic Multisig recovery

How to recover funds from a 2-of-3 Casa Bitcoin Wallet without using Casa software or servers

Find your Casa recovery data email that contains your extended public keys

1. In the Casa Keymaster app, tap the "Mobile Key" wallet
2. Tap the mobile device
3. Tap "View Public Keys"
4. Tap "BTC Account"
5. Write down the Derivation Path, which should look like: m/49/0/1
6. Go back 2 screens to the Mobile Key view
7. Tap "Export Private Key"
8. Write down the seed phrase

Install the latest version of Electrum: https://electrum.org/#download

NOTE: Electrum can be finicky with hardware signing device support, especially on Linux. In order to prevent errors, ensure that you only have ONE electrum instance running and plug ALL of your hardware devices in simultaneously rather than plugging and unplugging the devices as you sign.

## Linux Only

Install the appropriate libraries for your hardware wallets:

1. `sudo apt-get install libusb-1.0-0-dev libudev-dev`
2. `sudo pip3 install btchip-python`
3. `sudo pip3 install trezor`
4. Set udev rules for ledger: https://support.ledgerwallet.com/hc/en-us/articles/115005165269-Fix-connection-issues
5. Set udev rules for trezor: https://doc.satoshilabs.com/trezor-user/settingupchromeonlinux.html
6. After setting the udev rules for the first time, reboot your computer.

## Step-By-Step Guide

1. Run electrum. For testnet, run "electrum --testnet"
2. Create a new wallet and give it a name
3. Choose "multi-signature wallet"
4. Select "From 3 cosigners"
5. Select "Require 2 signatures"
6. Click next.

### For cosigner 1 of 3:
1. Choose "hardware wallet"
2. Plug in hardware device 1 if it isn't already
3. Click next
4. Select your hardware device and click next
5. Select p2sh-segwit multisig
6. The derivation path should change to something like m/48'/0'/0'/1' - replace it with the derivation path from your recovery data, which will look something like: m/49/0/0
7. Click next, then next again on the master public key screen

### For cosigner 2 of 3:
1. Select "I already have a seed"
2. Click next
3. Type the seed phrase into the box
4. Click "Options"
5. Check "BIP39 seed"
6. Click "OK"
7. Click "Next"
8. Select "p2sh-segwit (p2wpkh-p2sh)"
9. The derivation path should change to something like m/48'/0'/0'/1' - replace it with the derivation path from your recovery data, which will look something like: m/49/0/0
10. Click "Next"

### For cosigner 3 of 3:
1. Choose "Enter cosigner key" and click next.
2. Paste the "Recovery Device Key" for the appropriate account from your recovery data.
3. Click next.
4. On the password screen, leave both fields blank and click next.

Electrum will now initialize your wallet and display all of the transactions that have been received and sent by it. If you don't see your transactions show up after a minute or so, something went wrong during the process and electrum derived the wrong set of addresses.

To send your assets to a new wallet, click on the "send" tab and fill in the "pay to" field with and address owned by your new wallet. Click the "max" button to sweep all of the value out of the wallet, and slide the "fee" bar to an appropriate fee depending upon your urgency.

Once you click "send" you will be prompted to confirm the amount and destination address on the hardware device.

Upon completing the second signature, the "broadcast" button will no longer be greyed out. Click "broadcast" and then copy the transaction id into a block explorer to check that the transaction has propagated across the network.

# Casa Keymaster Mobile Key recovery

How to recover funds from a single sig mobile key Casa Bitcoin Wallet without using Casa software or servers.

1. In the Casa Keymaster app, tap the "Mobile Key" wallet
2. Tap the mobile device
3. Tap "View Public Keys"
4. Tap "BTC Account"
5. Write down the Derivation Path, which should look like: m/49/0/1
6. Go back 2 screens to the Mobile Key view
7. Tap "Export Private Key"
8. Write down the seed phrase

Install the latest version of Electrum: https://electrum.org/#download

1. Run electrum
2. Create a new wallet and give it a name
3. Choose "standard wallet"
4. Click next
5. Select "I already have a seed"
6. Click next
7. Type the seed phrase into the box
8. Click "Options"
9. Check "BIP39 seed"
10. Click "OK"
11. Click "Next"
12. Select "p2sh-segwit (p2wpkh-p2sh)""
13. Type the derivation path you wrote down earlier
14. Click "Next"
15. On the password screen, leave both fields blank and click "Next"

Electrum will now initialize your wallet and display all of the transactions that have been received and sent by it. If you don't see your transactions show up after a minute or so, something went wrong during the process and electrum derived the wrong set of addresses.

To send your assets to a new wallet, click on the "send" tab and fill in the "pay to" field with and address owned by your new wallet. Click the "max" button to sweep all of the value out of the wallet, and slide the "fee" bar to an appropriate fee depending upon your urgency.