import {
    Address,
    beginCell,
    contractAddress,
    toNano,
    TonClient4,
    internal,
    fromNano,
    WalletContractV4,
} from "@ton/ton";
import { deploy } from "../utils/deploy";
import { printAddress, printDeploy, printHeader, printSeparator } from "../utils/print";
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { endpoint, workchain, JETTONADDR } from "./constants";
import * as dotenv from "dotenv";
dotenv.config();
// ========================================
import { Stom, storeTokenTransfer } from "../output/stom_Stom";
// ========================================

(async () => {
    const client4 = new TonClient4({
        endpoint: endpoint,
    });

    let mnemonics = (process.env.mnemonics || "").toString(); // 🔴 Change to your own, by creating .env file!
    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let secretKey = keyPair.secretKey;
    let wallet = WalletContractV4.create({
        workchain,
        publicKey: keyPair.publicKey,
    });

    let wallet_contract = client4.open(wallet);

    let mnemonics1 = (process.env.mnemonics1 || "").toString(); // 🔴 Change to your own, by creating .env file!
    let keyPair1 = await mnemonicToPrivateKey(mnemonics1.split(" "));
    let secretKey1 = keyPair1.secretKey;
    let wallet1 = WalletContractV4.create({
        workchain,
        publicKey: keyPair1.publicKey,
    });

    let wallet_contract1 = client4.open(wallet1);

    let jetton_masterWallet = Address.parse(JETTONADDR);
    let contract_dataFormat = Stom.fromAddress(jetton_masterWallet);
    let contract = client4.open(contract_dataFormat);
    console.log("wallet address", wallet_contract.address);
    console.log("Jetton address", contract.address);
    let jetton_wallet = await contract.getGetWalletAddress(wallet_contract.address);

    // ✨Pack the forward message into a cell
    const test_message_left = beginCell()
        .storeBit(0) // 🔴  whether you want to store the forward payload in the same cell or not. 0 means no, 1 means yes.
        .storeUint(0, 32)
        .storeBuffer(Buffer.from("Send token", "utf-8"))
        .endCell();

    // const test_message_right = beginCell()
    //     .storeBit(1) // 🔴 whether you want to store the forward payload in the same cell or not. 0 means no, 1 means yes.
    //     .storeRef(beginCell().storeUint(0, 32).storeBuffer(Buffer.from("Hello, GM. -- Right", "utf-8")).endCell())
    //     .endCell();

    // ========================================
    let forward_string_test = beginCell().storeBit(1).storeUint(0, 32).storeStringTail("EEEEEE").endCell();
    let packed = beginCell()
        .store(
            storeTokenTransfer({
                $$type: "TokenTransfer",
                query_id: 0n,
                amount: toNano(12345),
                destination: wallet_contract.address,
                response_destination: wallet_contract.address, // Original Owner, aka. First Minter's Jetton Wallet
                custom_payload: forward_string_test,
                forward_ton_amount: toNano("0.15"),
                forward_payload: test_message_left,
            })
        )
        .endCell();

    let value = toNano("0.2");
    let seqno: number = await wallet_contract.getSeqno();
    let balance: bigint = await wallet_contract.getBalance();
    // ========================================
    printSeparator();
    console.log("Wallet balance: ", fromNano(balance).toString(), "💎TON");
    console.log("\n🛠️ Calling To JettonWallet:\n" + jetton_wallet + "\n");
    await wallet_contract.sendTransfer({
        seqno,
        secretKey,
        messages: [
            internal({
                to: jetton_wallet,
                value: value,
                bounce: true,
                body: packed,
            }),
        ],
    });
})();
