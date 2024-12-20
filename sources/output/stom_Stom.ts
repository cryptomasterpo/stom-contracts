import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address.asCell());
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type ClaimUserReward = {
    $$type: 'ClaimUserReward';
    base_rate: bigint;
    growth_rate: bigint;
}

export function storeClaimUserReward(src: ClaimUserReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3814213294, 32);
        b_0.storeUint(src.base_rate, 64);
        b_0.storeUint(src.growth_rate, 64);
    };
}

export function loadClaimUserReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3814213294) { throw Error('Invalid prefix'); }
    let _base_rate = sc_0.loadUintBig(64);
    let _growth_rate = sc_0.loadUintBig(64);
    return { $$type: 'ClaimUserReward' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadTupleClaimUserReward(source: TupleReader) {
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'ClaimUserReward' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadGetterTupleClaimUserReward(source: TupleReader) {
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'ClaimUserReward' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function storeTupleClaimUserReward(source: ClaimUserReward) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.base_rate);
    builder.writeNumber(source.growth_rate);
    return builder.build();
}

function dictValueParserClaimUserReward(): DictionaryValue<ClaimUserReward> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimUserReward(src)).endCell());
        },
        parse: (src) => {
            return loadClaimUserReward(src.loadRef().beginParse());
        }
    }
}

export type ClaimAndLock = {
    $$type: 'ClaimAndLock';
    amount: bigint;
}

export function storeClaimAndLock(src: ClaimAndLock) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(945132301, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadClaimAndLock(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 945132301) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'ClaimAndLock' as const, amount: _amount };
}

function loadTupleClaimAndLock(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'ClaimAndLock' as const, amount: _amount };
}

function loadGetterTupleClaimAndLock(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'ClaimAndLock' as const, amount: _amount };
}

function storeTupleClaimAndLock(source: ClaimAndLock) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserClaimAndLock(): DictionaryValue<ClaimAndLock> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimAndLock(src)).endCell());
        },
        parse: (src) => {
            return loadClaimAndLock(src.loadRef().beginParse());
        }
    }
}

export type ClaimAndLockUser = {
    $$type: 'ClaimAndLockUser';
    amount: bigint;
    base_rate: bigint;
    growth_rate: bigint;
}

export function storeClaimAndLockUser(src: ClaimAndLockUser) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(251751909, 32);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.base_rate, 64);
        b_0.storeUint(src.growth_rate, 64);
    };
}

export function loadClaimAndLockUser(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 251751909) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _base_rate = sc_0.loadUintBig(64);
    let _growth_rate = sc_0.loadUintBig(64);
    return { $$type: 'ClaimAndLockUser' as const, amount: _amount, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadTupleClaimAndLockUser(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'ClaimAndLockUser' as const, amount: _amount, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadGetterTupleClaimAndLockUser(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'ClaimAndLockUser' as const, amount: _amount, base_rate: _base_rate, growth_rate: _growth_rate };
}

function storeTupleClaimAndLockUser(source: ClaimAndLockUser) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.base_rate);
    builder.writeNumber(source.growth_rate);
    return builder.build();
}

function dictValueParserClaimAndLockUser(): DictionaryValue<ClaimAndLockUser> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimAndLockUser(src)).endCell());
        },
        parse: (src) => {
            return loadClaimAndLockUser(src.loadRef().beginParse());
        }
    }
}

export type ClaimNotification = {
    $$type: 'ClaimNotification';
    user_address: Address;
    amount: bigint;
}

export function storeClaimNotification(src: ClaimNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2601675930, 32);
        b_0.storeAddress(src.user_address);
        b_0.storeCoins(src.amount);
    };
}

export function loadClaimNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2601675930) { throw Error('Invalid prefix'); }
    let _user_address = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'ClaimNotification' as const, user_address: _user_address, amount: _amount };
}

function loadTupleClaimNotification(source: TupleReader) {
    let _user_address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ClaimNotification' as const, user_address: _user_address, amount: _amount };
}

function loadGetterTupleClaimNotification(source: TupleReader) {
    let _user_address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ClaimNotification' as const, user_address: _user_address, amount: _amount };
}

function storeTupleClaimNotification(source: ClaimNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user_address);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserClaimNotification(): DictionaryValue<ClaimNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimNotification(src)).endCell());
        },
        parse: (src) => {
            return loadClaimNotification(src.loadRef().beginParse());
        }
    }
}

export type LockNotification = {
    $$type: 'LockNotification';
    user_address: Address;
    amount: bigint;
}

export function storeLockNotification(src: LockNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3021919426, 32);
        b_0.storeAddress(src.user_address);
        b_0.storeCoins(src.amount);
    };
}

export function loadLockNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3021919426) { throw Error('Invalid prefix'); }
    let _user_address = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'LockNotification' as const, user_address: _user_address, amount: _amount };
}

function loadTupleLockNotification(source: TupleReader) {
    let _user_address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'LockNotification' as const, user_address: _user_address, amount: _amount };
}

function loadGetterTupleLockNotification(source: TupleReader) {
    let _user_address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'LockNotification' as const, user_address: _user_address, amount: _amount };
}

function storeTupleLockNotification(source: LockNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user_address);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserLockNotification(): DictionaryValue<LockNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLockNotification(src)).endCell());
        },
        parse: (src) => {
            return loadLockNotification(src.loadRef().beginParse());
        }
    }
}

export type Vote = {
    $$type: 'Vote';
    base_rate: bigint;
    growth_rate: bigint;
}

export function storeVote(src: Vote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2693419846, 32);
        b_0.storeUint(src.base_rate, 32);
        b_0.storeUint(src.growth_rate, 32);
    };
}

export function loadVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2693419846) { throw Error('Invalid prefix'); }
    let _base_rate = sc_0.loadUintBig(32);
    let _growth_rate = sc_0.loadUintBig(32);
    return { $$type: 'Vote' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadTupleVote(source: TupleReader) {
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'Vote' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadGetterTupleVote(source: TupleReader) {
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'Vote' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function storeTupleVote(source: Vote) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.base_rate);
    builder.writeNumber(source.growth_rate);
    return builder.build();
}

function dictValueParserVote(): DictionaryValue<Vote> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVote(src)).endCell());
        },
        parse: (src) => {
            return loadVote(src.loadRef().beginParse());
        }
    }
}

export type VoteNotification = {
    $$type: 'VoteNotification';
    amount: bigint;
    base_rate: bigint;
    growth_rate: bigint;
}

export function storeVoteNotification(src: VoteNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2955191417, 32);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.base_rate, 32);
        b_0.storeUint(src.growth_rate, 32);
    };
}

export function loadVoteNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2955191417) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _base_rate = sc_0.loadUintBig(32);
    let _growth_rate = sc_0.loadUintBig(32);
    return { $$type: 'VoteNotification' as const, amount: _amount, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadTupleVoteNotification(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'VoteNotification' as const, amount: _amount, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadGetterTupleVoteNotification(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'VoteNotification' as const, amount: _amount, base_rate: _base_rate, growth_rate: _growth_rate };
}

function storeTupleVoteNotification(source: VoteNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.base_rate);
    builder.writeNumber(source.growth_rate);
    return builder.build();
}

function dictValueParserVoteNotification(): DictionaryValue<VoteNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVoteNotification(src)).endCell());
        },
        parse: (src) => {
            return loadVoteNotification(src.loadRef().beginParse());
        }
    }
}

export type MaxRates = {
    $$type: 'MaxRates';
    base_rate: bigint;
    growth_rate: bigint;
}

export function storeMaxRates(src: MaxRates) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(247861601, 32);
        b_0.storeUint(src.base_rate, 32);
        b_0.storeUint(src.growth_rate, 32);
    };
}

export function loadMaxRates(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 247861601) { throw Error('Invalid prefix'); }
    let _base_rate = sc_0.loadUintBig(32);
    let _growth_rate = sc_0.loadUintBig(32);
    return { $$type: 'MaxRates' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadTupleMaxRates(source: TupleReader) {
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'MaxRates' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function loadGetterTupleMaxRates(source: TupleReader) {
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    return { $$type: 'MaxRates' as const, base_rate: _base_rate, growth_rate: _growth_rate };
}

function storeTupleMaxRates(source: MaxRates) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.base_rate);
    builder.writeNumber(source.growth_rate);
    return builder.build();
}

function dictValueParserMaxRates(): DictionaryValue<MaxRates> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMaxRates(src)).endCell());
        },
        parse: (src) => {
            return loadMaxRates(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    amount: bigint;
    receiver: Address;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadGetterTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type Stom$Data = {
    $$type: 'Stom$Data';
    total_supply: bigint;
    owner: Address;
    content: Cell;
    mintable: boolean;
    max_supply: bigint;
    total_locked: bigint;
    base_rate: bigint;
    growth_rate: bigint;
    max_base: bigint;
    max_growth: bigint;
}

export function storeStom$Data(src: Stom$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeBit(src.mintable);
        b_0.storeCoins(src.max_supply);
        b_0.storeCoins(src.total_locked);
        b_0.storeUint(src.base_rate, 32);
        b_0.storeUint(src.growth_rate, 32);
        b_0.storeUint(src.max_base, 32);
        b_0.storeUint(src.max_growth, 32);
    };
}

export function loadStom$Data(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _mintable = sc_0.loadBit();
    let _max_supply = sc_0.loadCoins();
    let _total_locked = sc_0.loadCoins();
    let _base_rate = sc_0.loadUintBig(32);
    let _growth_rate = sc_0.loadUintBig(32);
    let _max_base = sc_0.loadUintBig(32);
    let _max_growth = sc_0.loadUintBig(32);
    return { $$type: 'Stom$Data' as const, total_supply: _total_supply, owner: _owner, content: _content, mintable: _mintable, max_supply: _max_supply, total_locked: _total_locked, base_rate: _base_rate, growth_rate: _growth_rate, max_base: _max_base, max_growth: _max_growth };
}

function loadTupleStom$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _max_supply = source.readBigNumber();
    let _total_locked = source.readBigNumber();
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    let _max_base = source.readBigNumber();
    let _max_growth = source.readBigNumber();
    return { $$type: 'Stom$Data' as const, total_supply: _total_supply, owner: _owner, content: _content, mintable: _mintable, max_supply: _max_supply, total_locked: _total_locked, base_rate: _base_rate, growth_rate: _growth_rate, max_base: _max_base, max_growth: _max_growth };
}

function loadGetterTupleStom$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _max_supply = source.readBigNumber();
    let _total_locked = source.readBigNumber();
    let _base_rate = source.readBigNumber();
    let _growth_rate = source.readBigNumber();
    let _max_base = source.readBigNumber();
    let _max_growth = source.readBigNumber();
    return { $$type: 'Stom$Data' as const, total_supply: _total_supply, owner: _owner, content: _content, mintable: _mintable, max_supply: _max_supply, total_locked: _total_locked, base_rate: _base_rate, growth_rate: _growth_rate, max_base: _max_base, max_growth: _max_growth };
}

function storeTupleStom$Data(source: Stom$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.max_supply);
    builder.writeNumber(source.total_locked);
    builder.writeNumber(source.base_rate);
    builder.writeNumber(source.growth_rate);
    builder.writeNumber(source.max_base);
    builder.writeNumber(source.max_growth);
    return builder.build();
}

function dictValueParserStom$Data(): DictionaryValue<Stom$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStom$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStom$Data(src.loadRef().beginParse());
        }
    }
}

export type JettonDefaultWallet$Data = {
    $$type: 'JettonDefaultWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
    locked: bigint;
    lastRewardTime: bigint;
    lastLockedTime: bigint;
    lastVoteTime: bigint;
}

export function storeJettonDefaultWallet$Data(src: JettonDefaultWallet$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeCoins(src.locked);
        b_0.storeUint(src.lastRewardTime, 32);
        b_0.storeUint(src.lastLockedTime, 32);
        b_0.storeUint(src.lastVoteTime, 32);
    };
}

export function loadJettonDefaultWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _locked = sc_0.loadCoins();
    let _lastRewardTime = sc_0.loadUintBig(32);
    let _lastLockedTime = sc_0.loadUintBig(32);
    let _lastVoteTime = sc_0.loadUintBig(32);
    return { $$type: 'JettonDefaultWallet$Data' as const, balance: _balance, owner: _owner, master: _master, locked: _locked, lastRewardTime: _lastRewardTime, lastLockedTime: _lastLockedTime, lastVoteTime: _lastVoteTime };
}

function loadTupleJettonDefaultWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _locked = source.readBigNumber();
    let _lastRewardTime = source.readBigNumber();
    let _lastLockedTime = source.readBigNumber();
    let _lastVoteTime = source.readBigNumber();
    return { $$type: 'JettonDefaultWallet$Data' as const, balance: _balance, owner: _owner, master: _master, locked: _locked, lastRewardTime: _lastRewardTime, lastLockedTime: _lastLockedTime, lastVoteTime: _lastVoteTime };
}

function loadGetterTupleJettonDefaultWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _locked = source.readBigNumber();
    let _lastRewardTime = source.readBigNumber();
    let _lastLockedTime = source.readBigNumber();
    let _lastVoteTime = source.readBigNumber();
    return { $$type: 'JettonDefaultWallet$Data' as const, balance: _balance, owner: _owner, master: _master, locked: _locked, lastRewardTime: _lastRewardTime, lastLockedTime: _lastLockedTime, lastVoteTime: _lastVoteTime };
}

function storeTupleJettonDefaultWallet$Data(source: JettonDefaultWallet$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeNumber(source.locked);
    builder.writeNumber(source.lastRewardTime);
    builder.writeNumber(source.lastLockedTime);
    builder.writeNumber(source.lastVoteTime);
    return builder.build();
}

function dictValueParserJettonDefaultWallet$Data(): DictionaryValue<JettonDefaultWallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonDefaultWallet$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonDefaultWallet$Data(src.loadRef().beginParse());
        }
    }
}

 type Stom_init_args = {
    $$type: 'Stom_init_args';
    owner: Address;
    content: Cell;
    max_supply: bigint;
}

function initStom_init_args(src: Stom_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeInt(src.max_supply, 257);
    };
}

async function Stom_init(owner: Address, content: Cell, max_supply: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initStom_init_args({ $$type: 'Stom_init_args', owner, content, max_supply })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Stom_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    9511: { message: `amount exceeds balance` },
    16059: { message: `Invalid value` },
    18668: { message: `Can't Mint Anymore` },
    34913: { message: `exceed max growth rate.` },
    39579: { message: `Exceed max supply` },
    41223: { message: `no reward` },
    42439: { message: `exceed max base rate.` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    51462: { message: `vote is not allowed` },
    62972: { message: `Invalid balance` },
}

const Stom_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ClaimUserReward","header":3814213294,"fields":[{"name":"base_rate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"growth_rate","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimAndLock","header":945132301,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClaimAndLockUser","header":251751909,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"base_rate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"growth_rate","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimNotification","header":2601675930,"fields":[{"name":"user_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LockNotification","header":3021919426,"fields":[{"name":"user_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Vote","header":2693419846,"fields":[{"name":"base_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"growth_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"VoteNotification","header":2955191417,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"base_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"growth_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MaxRates","header":247861601,"fields":[{"name":"base_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"growth_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Stom$Data","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"max_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"total_locked","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"base_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"growth_rate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"max_base","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"max_growth","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"JettonDefaultWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"locked","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lastRewardTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastLockedTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastVoteTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const Stom_getters: ABIGetter[] = [
    {"name":"reward_rate","arguments":[{"name":"locked_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Stom_getterMapping: { [key: string]: string } = {
    'reward_rate': 'getRewardRate',
    'get_jetton_data': 'getGetJettonData',
    'get_wallet_address': 'getGetWalletAddress',
    'owner': 'getOwner',
}

const Stom_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
    {"receiver":"internal","message":{"kind":"text","text":"ClaimReward"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimAndLock"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LockNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"VoteNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MaxRates"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class Stom implements Contract {
    
    static async init(owner: Address, content: Cell, max_supply: bigint) {
        return await Stom_init(owner, content, max_supply);
    }
    
    static async fromInit(owner: Address, content: Cell, max_supply: bigint) {
        const init = await Stom_init(owner, content, max_supply);
        const address = contractAddress(0, init);
        return new Stom(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Stom(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Stom_types,
        getters: Stom_getters,
        receivers: Stom_receivers,
        errors: Stom_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Mint | 'ClaimReward' | ClaimAndLock | ClaimNotification | LockNotification | VoteNotification | MaxRates | TokenUpdateContent | TokenBurnNotification | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message === 'ClaimReward') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimAndLock') {
            body = beginCell().store(storeClaimAndLock(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimNotification') {
            body = beginCell().store(storeClaimNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LockNotification') {
            body = beginCell().store(storeLockNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VoteNotification') {
            body = beginCell().store(storeVoteNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MaxRates') {
            body = beginCell().store(storeMaxRates(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenUpdateContent') {
            body = beginCell().store(storeTokenUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurnNotification') {
            body = beginCell().store(storeTokenBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getRewardRate(provider: ContractProvider, locked_amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(locked_amount);
        let source = (await provider.get('reward_rate', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}