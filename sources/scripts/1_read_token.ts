import {
    WalletContractV4,
    beginCell,
    Address,
    contractAddress,
    ContractProvider,
    TonClient4,
    TonClient,
    fromNano,
    toNano,
    Cell,
    BitString,
    Slice,
} from "@ton/ton";
import { printSeparator } from "../utils/print";
import * as dotenv from "dotenv";
dotenv.config();

// Contract Abi //
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { mnemonicToPrivateKey } from "@ton/crypto";

import { Stom } from "../output/stom_Stom";
import { JettonDefaultWallet } from "../output/stom_JettonDefaultWallet";

import { endpoint, workchain, JETTONADDR } from "./constants";
(async () => {
    const client = new TonClient4({
        endpoint: endpoint,
    });
    const mnemonics = process.env.mnemonics?.toString() || "";
    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let deploy_wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let deployer_wallet_contract = client.open(deploy_wallet);

    let jetton_master_addr = Address.parse(JETTONADDR);
    console.log("Jetton Master: " + jetton_master_addr);
    let contract_jm = await client.open(Stom.fromAddress(jetton_master_addr));
    let jetton_wallet = await contract_jm.getGetWalletAddress(deployer_wallet_contract.address);
    let contract_dataFormat = JettonDefaultWallet.fromAddress(jetton_wallet);
    let contract = client.open(contract_dataFormat);
    console.log("Deployer's JettonWallet: " + contract.address);
    let jettonWalletBalance = (await contract.getGetWalletData()).balance;
    let owner_of_wallet = await contract.getGetWalletData();
    console.log("JettonWallet Balance: " + fromNano(jettonWalletBalance));
    console.log("JettonWallet Owner: ", owner_of_wallet.owner);
    console.log("deployer wallet address:", deployer_wallet_contract.address);
})();
