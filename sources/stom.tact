import "@stdlib/ownable";
import "@stdlib/deploy";
import "./messages";
message Mint {
    amount: Int;
    receiver: Address;
}

contract Stom with Jetton {
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    max_supply: Int as coins;
    total_locked: Int as coins;
    base_rate: Int as uint32; //rate decimal is 4. 100.00%  = 10000
    growth_rate: Int as uint32;
    max_base: Int as uint32;
    max_growth: Int as uint32;
    init(owner: Address, content: Cell, max_supply: Int){
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.max_supply = max_supply;
        self.base_rate = 50000;
        self.growth_rate = 11000;
        self.max_base = 50000;
        self.max_growth = 11000;
        self.total_locked = 0;
    }

    receive(msg: Mint){
        self.requireOwner();
        require((self.total_supply + msg.amount) <= self.max_supply, "Exceed max supply");
        self.mint(msg.receiver, msg.amount, context().sender);
    }

    receive("ClaimReward"){
        let winit: StateInit = self.getJettonWalletInit(context().sender);
        send(SendParameters{
                to: contractAddress(winit),
                value: 0,
                bounce: true,
                mode: SendRemainingValue,
                body: ClaimUserReward{base_rate: self.base_rate, growth_rate: self.growth_rate}.toCell(),
                code: winit.code,
                data: winit.data
            }
        );
    }

    receive(msg: ClaimAndLock){
        let winit: StateInit = self.getJettonWalletInit(context().sender);
        send(SendParameters{
                to: contractAddress(winit),
                value: 0,
                bounce: true,
                mode: SendRemainingValue,
                body: ClaimAndLockUser{
                    amount: msg.amount,
                    base_rate: self.base_rate,
                    growth_rate: self.growth_rate
                }.toCell(),
                code: winit.code,
                data: winit.data
            }
        );
    }

    receive(msg: ClaimNotification){
        self.requireSenderAsWalletOwner(msg.user_address);
        self.total_supply = self.total_supply + msg.amount;
    }

    receive(msg: LockNotification){
        self.requireSenderAsWalletOwner(msg.user_address);
        self.total_supply = self.total_supply - msg.amount;
        self.total_locked = self.total_locked + msg.amount;
    }

    receive(msg: VoteNotification){
        require(msg.base_rate <= self.max_base, "exceed max base rate.");
        require(msg.growth_rate <= self.max_growth, "exceed max growth rate.");
        require(msg.base_rate > 0, "exceed max base rate.");
        require(msg.growth_rate > 0, "exceed max growth rate.");
        let new_base: Int =
            ((self.base_rate * (self.total_locked - msg.amount)) + (msg.base_rate * msg.amount)) / self.total_locked;
        let new_growth: Int =
            ((self.growth_rate *
                (self.total_locked -
                msg.amount)) +
                (msg.growth_rate *
                msg.amount)) /
                self.total_locked;
        self.base_rate = new_base;
        self.growth_rate = new_growth;
    }

    receive(msg: MaxRates){
        self.requireOwner();
        self.max_base = msg.base_rate;
        self.max_growth = msg.growth_rate;
    }

    get fun reward_rate(locked_amount: Int): Int {
        let rate: Int = 0;
        if (locked_amount > 0) {
            let exp: Int = log2(locked_amount / 1000000000);
            rate = (self.base_rate * pow(self.growth_rate, exp)) / pow(10000, exp);
        }
        return rate;
    }
}
// ============================================================================================================ //
@interface("org.ton.jetton.master")
trait Jetton with OwnableTransferable {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;

    receive(msg: TokenUpdateContent){
        self.requireOwner(); // Allow changing content only by owner
        self.content = msg.content; // Update content
    }

    receive(msg: TokenBurnNotification){
        self.requireSenderAsWalletOwner(context().sender); // Check wallet
        self.total_supply = self.total_supply - msg.amount; // Update supply
        if (msg.response_destination != null) {
            // Cashback
            send(SendParameters{
                    to: msg.response_destination!!,
                    value: 0,
                    bounce: false,
                    mode: SendRemainingValue,
                    body: TokenExcesses{query_id: msg.query_id}.toCell()
                }
            );
        }
    }

    // Private Methods //
    // @to The Address receive the Jetton token after minting
    // @amount The amount of Jetton token being minted
    // @response_destination The previous owner address
    fun mint(to: Address, amount: Int, response_destination: Address) {
        require(self.mintable, "Can't Mint Anymore");
        self.total_supply = self.total_supply + amount; // Update total supply
        let winit: StateInit = self.getJettonWalletInit(to); // Create message
        send(SendParameters{
                to: contractAddress(winit),
                value: 0,
                bounce: true,
                mode: SendRemainingValue,
                body: TokenTransferInternal{
                    query_id: 0,
                    amount: amount,
                    from: myAddress(),
                    response_destination: response_destination,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().endCell().asSlice()
                }.toCell(),
                code: winit.code,
                data: winit.data
            }
        );
    }

    fun requireSenderAsWalletOwner(owner: Address) {
        let ctx: Context = context();
        let winit: StateInit = self.getJettonWalletInit(owner);
        require(contractAddress(winit) == ctx.sender, "Invalid sender");
    }

    virtual fun getJettonWalletInit(address: Address): StateInit {
        return initOf JettonDefaultWallet(address, myAddress());
    }

    // ====== Get Methods ====== //

    get fun get_jetton_data(): JettonData {
        return
            JettonData{
                total_supply: self.total_supply,
                mintable: self.mintable,
                owner: self.owner,
                content: self.content,
                wallet_code: initOf JettonDefaultWallet(self.owner, myAddress()).code
            };
    }

    get fun get_wallet_address(owner: Address): Address {
        return contractAddress(initOf JettonDefaultWallet(owner, myAddress()));
    }
}

// ============================================================ //
@interface("org.ton.jetton.wallet")
contract JettonDefaultWallet
{
    const minTonsForStorage: Int = ton("0.019");
    const gasConsumption: Int = ton("0.013");
    balance: Int as coins = 0;
    owner: Address;
    master: Address;
    locked: Int as coins = 0;
    lastRewardTime: Int as uint32;
    lastLockedTime: Int as uint32;
    lastVoteTime: Int as uint32;
    init(owner: Address, master: Address){
        self.balance = 0;
        self.owner = owner;
        self.master = master;
        self.locked = 0;
        self.lastRewardTime = 0;
        self.lastLockedTime = 0;
        self.lastVoteTime = 0;
    }

    receive(msg: TokenTransfer){
        // 0xf8a7ea5
        let ctx: Context = context(); // Check sender
        require(ctx.sender == self.owner, "Invalid sender");
        let final: Int =
            (((ctx.readForwardFee() *
                2) +
                (2 *
                self.gasConsumption)) +
                self.minTonsForStorage) +
                msg.forward_ton_amount; // Gas checks, forward_ton = 0.152
        require(ctx.value > final, "Invalid value");
        // Update balance
        self.balance = self.balance - msg.amount;
        require(self.balance >= 0, "Invalid balance");
        let init: StateInit = initOf JettonDefaultWallet(msg.destination, self.master);
        let wallet_address: Address = contractAddress(init);
        send(SendParameters{
                to: wallet_address,
                value: 0,
                mode: SendRemainingValue,
                bounce: true,
                body: TokenTransferInternal{ // 0x178d4519
                    query_id: msg.query_id,
                    amount: msg.amount,
                    from: self.owner,
                    response_destination: msg.response_destination,
                    forward_ton_amount: msg.forward_ton_amount,
                    forward_payload: msg.forward_payload
                }.toCell(),
                code: init.code,
                data: init.data
            }
        );
    }

    receive(msg: TokenTransferInternal){
        // 0x178d4519
        let ctx: Context = context();
        if (ctx.sender != self.master) {
            let sinit: StateInit = initOf JettonDefaultWallet(msg.from, self.master);
            require(contractAddress(sinit) == ctx.sender, "Invalid sender!");
        }
        // Update balance
        self.balance = self.balance + msg.amount;
        require(self.balance >= 0, "Invalid balance");
        // Get value for gas
        let msg_val: Int = self.msg_value(ctx.value);
        let fwd_fee: Int = ctx.readForwardFee();
        if (msg.forward_ton_amount > 0) {
            msg_val = (msg_val - msg.forward_ton_amount) - fwd_fee;
            send(SendParameters{
                    to: self.owner,
                    value: msg.forward_ton_amount,
                    mode: SendPayGasSeparately,
                    bounce: false,
                    body: TokenNotification{ // 0x7362d09c -- Remind the new Owner
                        query_id: msg.query_id,
                        amount: msg.amount,
                        from: msg.from,
                        forward_payload: msg.forward_payload
                    }.toCell()
                }
            );
        }
        // 0xd53276db -- Cashback to the original Sender
        if (msg.response_destination != null && msg_val > 0) {
            send(SendParameters{
                    to: msg.response_destination!!,
                    value: msg_val,
                    bounce: false,
                    body: TokenExcesses{query_id: msg.query_id}.toCell(),
                    mode: SendPayGasSeparately
                }
            );
        }
    }

    receive(msg: TokenBurn){
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender"); // Check sender

        self.balance = self.balance - msg.amount; // Update balance
        require(self.balance >= 0, "Invalid balance");
        let fwd_fee: Int = ctx.readForwardFee(); // Gas checks
        require(ctx.value > ((fwd_fee + (2 * self.gasConsumption)) + self.minTonsForStorage), "Invalid value - Burn");
        // Burn tokens
        send(SendParameters{
                to: self.master,
                value: 0,
                mode: SendRemainingValue,
                bounce: true,
                body: TokenBurnNotification{
                    query_id: msg.query_id,
                    amount: msg.amount,
                    sender: self.owner,
                    response_destination: msg.response_destination
                }.toCell()
            }
        );
    }

    fun msg_value(value: Int): Int {
        let msg_val: Int = value;
        let ton_balance_before_msg: Int = myBalance() - msg_val;
        let storage_fee: Int = self.minTonsForStorage - min(ton_balance_before_msg, self.minTonsForStorage);
        msg_val = msg_val - (storage_fee + self.gasConsumption);
        return msg_val;
    }

    bounced(msg: bounced<TokenTransferInternal>){
        self.balance = self.balance + msg.amount;
    }

    bounced(msg: bounced<TokenBurnNotification>){
        self.balance = self.balance + msg.amount;
    }

    get fun get_wallet_data(): JettonWalletData {
        return
            JettonWalletData{
                balance: self.balance,
                owner: self.owner,
                master: self.master,
                code: initOf JettonDefaultWallet(self.owner, self.master).code
            };
    }

    receive(msg: ClaimUserReward){
        self.claimReward(msg.base_rate, msg.growth_rate);
    }

    receive(msg: ClaimAndLockUser){
        self.claimReward(msg.base_rate, msg.growth_rate);
        self.lock(msg.amount);
    }

    fun claimReward(baseRate: Int, rateGrowth: Int) {
        require(self.locked > 0 && self.lastLockedTime > 0, "no reward");
        let rewardPeriod: Int = 24 * 3600; // per day
        let timeElapse: Int = now() - self.lastRewardTime;
        let exp: Int = log2(self.locked / 1000000000);
        let rate: Int = (baseRate * pow(rateGrowth, exp)) / pow(10000, exp);
        let rewardRate: Int = (baseRate * pow(rateGrowth, rate)) / pow(10000, rate);
        let reward: Int = (((self.locked * rewardRate) / 10000) * timeElapse) / rewardPeriod;
        if (reward > 0) {
            self.balance = self.balance + reward;
            self.lastRewardTime = now();
            send(SendParameters{
                    to: self.master,
                    value: 0,
                    bounce: true,
                    mode: SendRemainingValue,
                    body: ClaimNotification{user_address: self.owner, amount: reward}.toCell()
                }
            );
        }
    }

    fun lock(amount: Int) {
        require(self.balance >= amount, "amount exceeds balance");
        self.balance = self.balance - amount;
        self.locked = self.locked + amount;
        if (self.lastRewardTime == 0) {
            self.lastRewardTime = now();
        }
        self.lastLockedTime = now();
        send(SendParameters{
                to: self.master,
                value: 0,
                bounce: true,
                mode: SendRemainingValue,
                body: LockNotification{user_address: self.owner, amount: amount}.toCell()
            }
        );
    }

    receive(msg: Vote){
        require(self.lastVoteTime < self.lastLockedTime, "vote is not allowed");
        send(SendParameters{
                to: self.master,
                value: 0,
                bounce: true,
                mode: SendRemainingValue,
                body: VoteNotification{
                    amount: self.locked,
                    base_rate: msg.base_rate,
                    growth_rate: msg.growth_rate
                }.toCell()
            }
        );
    }
}