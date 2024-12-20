import { beginCell, contractAddress, toNano, TonClient4, WalletContractV4, internal, fromNano } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { buildOnchainMetadata } from "../../utils/jetton-helpers";

import { Stom, storeMint } from "../../output/stom_Stom";

import { printSeparator } from "../../utils/print";
import { endpoint, workchain, jettonParams, max_supply } from "../constants";
import * as dotenv from "dotenv";
dotenv.config();

(async () => {
    //create client for testnet sandboxv4 API - alternative endpoint
    const client4 = new TonClient4({
        endpoint: endpoint,
    });

    let mnemonics = (process.env.mnemonics || "").toString(); // 🔴 Change to your own, by creating .env file!
    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let secretKey = keyPair.secretKey;
    let deployer_wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let deployer_wallet_contract = client4.open(deployer_wallet);
    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);
    // Compute init data for deployment
    // NOTICE: the parameters inside the init functions were the input for the contract address
    // which means any changes will change the smart contract address as well
    let init = await Stom.init(deployer_wallet_contract.address, content, max_supply);
    let jettonMaster = contractAddress(workchain, init);
    let deployAmount = toNano("0.15");

    let supply = toNano(3000000000); // 🔴 Specify total supply in nano
    let packed_msg = beginCell()
        .store(
            storeMint({
                $$type: "Mint",
                amount: supply,
                receiver: deployer_wallet_contract.address,
            })
        )
        .endCell();

    // send a message on new address contract to deploy it
    let seqno: number = await deployer_wallet_contract.getSeqno();
    console.log("======= Stom Contract Deployment =======");
    console.log("Deployment wallet: " + deployer_wallet_contract.address);
    console.log("Seqno: ", seqno + "\n");
    // Get deployment wallet balance
    let balance: bigint = await deployer_wallet_contract.getBalance();
    console.log("Wallet balance: ", fromNano(balance).toString(), "💎TON");
    console.log("Mint Amount: ", fromNano(supply));

    await deployer_wallet_contract.sendTransfer({
        seqno,
        secretKey,
        messages: [
            internal({
                to: jettonMaster,
                value: deployAmount,
                init: {
                    code: init.code,
                    data: init.data,
                },
                body: packed_msg,
                bounce: true,
            }),
        ],
    });
    console.log("======= Deployment message sent to =======\n", jettonMaster);
    printSeparator();
})();
