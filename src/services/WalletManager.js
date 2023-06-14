import {StoicIdentity} from "ic-stoic-identity";
import config from "../config";
import {principalToAccountIdentifier} from "../IC/utils";
import {AuthClient} from "@dfinity/auth-client";
import {walletData} from "./store";
import EventBus from "./EventBus";
import {useToast} from "vue-toastification";
const toast = useToast();
import RosettaApi from '@/services/RosettaApi.js';
export const rosettaApi = new RosettaApi();
import _api from "@/ic/api.js";

const loginSuccessAction = () =>{
    toast.success("Login successful!")
    EventBus.emit("showLoginModal", false)
}

class walletManager {
    checkLoginStatus(){
        var is_connected = localStorage.getItem("_w_connected");
        const logout = async() => {
            localStorage.removeItem("_w_connected");
            StoicIdentity.disconnect();
            walletData.setIdentity(false);
            walletData.setAccount([]);
            walletData.setBalance(0);
            walletData.setLoginState(false);
            walletData.setCurrentAccount({});
        };
        if (is_connected) {
            switch (is_connected) {
                case "stoic":
                    StoicIdentity.load().then(async (identity) => {
                        if (identity !== false) {
                            //ID is a already connected wallet!
                            walletData.setIdentity(identity);
                            identity.accounts().then((accs) => {
                                let _current_accounts = JSON.parse(accs);
                                walletData.setAccount(_current_accounts);
                                if(_current_accounts.length > 0){
                                    _current_accounts.forEach( (account, idx) => {
                                        let _current_account = JSON.parse(localStorage.getItem('_current_account'));
                                        if(_current_account && _current_account.address == account.address){
                                            walletData.setCurrentAccount(account);
                                            localStorage.setItem('_account_index', idx);//Set Account idx
                                            walletData.setCurrentAccountIdx(idx);
                                        }
                                    })
                                }
                                // walletData.setCurrentAccount(_current_account[0]);
                                walletData.getBalance();
                                // walletData.getStakingBalance();
                                // walletData.getXcanicBalance();
                                walletData.getWalletData();
                                // walletData.updateAccountPrincipal();
                            });
                        } else {
                            console.log("Error from stoic connect");
                            logout();
                        }
                    }).catch(e => {
                    });
                    break;
                case "plug":
                    (async () => {
                        const connected = await window?.ic?.plug.isConnected();
                        if (connected) {
                            if (!window.ic.plug.agent) {
                                await window.ic.plug.createAgent({
                                    whitelist: config.CANISTER_WHITE_LIST,
                                    host: config.IC_ENDPOINT
                                });
                            }
                            var pid = await window.ic.plug.agent.getPrincipal();
                            var id = {
                                type: "plug",
                                getPrincipal : () => pid
                            }
                            walletData.setIdentity(id);
                            walletData.setAccount([
                                {
                                    name: "Plug Wallet",
                                    address: principalToAccountIdentifier(id.getPrincipal().toText(), 0),
                                },
                            ]);
                            walletData.setCurrentAccount({ name: "Plug Wallet", address: principalToAccountIdentifier(id.getPrincipal().toText(), 0)});
                            walletData.loginAction('plug');
                        }else {
                            console.log("Plug not connected");
                            logout();
                        }
                    })();
                    break;
                case "infinity":
                    (async () => {
                        const connected = await window?.ic?.infinityWallet.isConnected();
                        console.log('connected: ', connected);
                        if (connected) {
                            if (!window.ic.infinityWallet.agent) {
                                await window.ic.infinityWallet.requestConnect({
                                    whitelist: config.CANISTER_WHITE_LIST,
                                });
                            }

                            const pid = await window.ic.infinityWallet.getPrincipal();
                            var id = {
                                type: "infinity",
                                getPrincipal : () => pid
                            }
                            walletData.setIdentity(id);
                            walletData.setAccount([
                                {
                                    name: "Infinity Wallet",
                                    address: principalToAccountIdentifier(id.getPrincipal().toText(), 0),
                                },
                            ]);
                            walletData.setCurrentAccount({ name: "Infinity Wallet", address: principalToAccountIdentifier(id.getPrincipal().toText(), 0)});
                            walletData.loginAction('infinity');
                        }else {
                            console.log("Infinity wallet not connected");
                            // logout();
                        }
                    })();
                    break;
                case "nns":
                    (async () => {
                        const authClient = await AuthClient.create({
                            idleOptions: {
                                disableIdle: true, // set to true to disable idle timeout
                            }
                        });
                        const identity = authClient.getIdentity();
                        console.log('_principal: ', identity._principal);
                        console.log('connected: ', identity);
                        if (identity) {
                            walletData.setIdentity(identity);
                            walletData.setAccount([
                                {
                                    name: "Internet Identity",
                                    address: principalToAccountIdentifier(identity.getPrincipal().toString(), 0),
                                },
                            ]);
                            walletData.setCurrentAccount({ name: "Internet Identity", address: principalToAccountIdentifier(identity.getPrincipal().toString(), 0)});
                            walletData.loginAction('nns');
                        }else {
                            console.log("Internet Identity not connected");
                            // logout();
                        }
                    })();
                    break;
                default:
                    break;
            }
        }
    };
    logoutAction(){
        localStorage.removeItem("_w_connected");
        StoicIdentity.disconnect();
        walletData.setIdentity(false);
        walletData.setAccount([]);
        walletData.setBalance(0);
        walletData.setLoginState(false);
        walletData.setCurrentAccount({});
        walletData.logoutAction();
    };
    connectLoading(){
        window.Swal.fire({
            html: '<div class="spinner-grow spinner-grow-sm" role="status"></div> Connecting, please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                window.Swal.showLoading()
            }
        });
    };
    async stoicWallet(){
        this.connectLoading();
        try {
            var identity;
            identity = await StoicIdentity.connect();
            //To store the identity temporary
            // window.ic.identityStoic = identity;
            if (identity) {
                window.Swal.close();
                walletData.setIdentity(identity);
                identity.accounts().then((accs) => {
                    let _current_account = JSON.parse(accs);
                    walletData.setAccount(_current_account);
                    walletData.setCurrentAccount(_current_account[0]);

                    // walletData.setCurrentAccountIdx(0);
                    // walletData.getBalance();
                    // walletData.getStakingBalance();
                    // walletData.getWalletData();
                    // walletData.getXcanicBalance();
                    // walletData.updateAccountPrincipal();
                });
                walletData.loginAction('stoic');
                loginSuccessAction();
                // setCurrentAccount(0);
                // localStorage.setItem("_w_connected", 'stoic');
                // walletData.setLoginState('stoic');
            }else {
                window.Swal.close();
                throw new Error("Failed to connect to your wallet");
            }
        } catch (e) {
            window.Swal.close();
            error(e);
        }
    };
    async plugWallet(){
        //Test if the user has Plug extension installed (other way?)
        if (typeof window?.ic?.plug == "undefined") {
            console.log("No plug extension");
            window.Swal.fire({icon: 'error', title: 'Error', text: 'No Plug Wallet extension!'});
            window.open('https://plugwallet.ooo/','_blank');
            return;
        }
        this.connectLoading();
        const whitelist = config.CANISTER_WHITE_LIST;
        // Host
        const host = config.IC_ENDPOINT;
        // Make the request

        try {
            const result = await window.ic.plug.requestConnect({
                whitelist,
                host,
            });
            const connectionState = result ? "allowed" : "denied";
            console.log(`The Connection was ${connectionState}!`);
            if(result){
                window.Swal.close();
                // Get the user principal id
                const pid = await window.ic.plug.getPrincipal();
                // const id = await window.ic.plug.agent._identity;
                var id = {
                    type: "plug",
                    getPrincipal : () => pid
                }
                const _current_account = {
                    name: "Plug Wallet",
                    address: principalToAccountIdentifier(id.getPrincipal().toText(), 0),
                };
                walletData.setIdentity(id);
                walletData.setAccount([_current_account]);
                walletData.setCurrentAccount(_current_account);
                walletData.loginAction('plug');
                loginSuccessAction();
            }
        }catch (e) {
            window.Swal.close();
            console.log('PLUG ERROR:', e);
        }
    };
    async bitfinityWallet(){
        if (typeof window?.ic?.bitfinityWallet == "undefined") {
            console.log("No infinityWallet extension");
            window.Swal.fire({icon: 'error', title: 'Error', text: 'No Infinity Wallet extension!'});
            window.open('https://wallet.infinityswap.one/','_blank');
            return;
        }
        this.connectLoading();

        // Host
        const host = "https://boundary.ic0.app/";
        const whitelist = config.CANISTER_WHITE_LIST;

        // Make the request
        try {
            const result = await window.ic.bitfinityWallet.requestConnect({
                whitelist,
                host,
                // timeout: 7 * 24 * 60 * 60 * 1000 * 1000 * 1000
            });

            if(result){
                window.Swal.close();
                const pid = await window.ic.bitfinityWallet.getPrincipal();
                var id = {
                    type: "bitfinity",
                    getPrincipal : () => pid
                }
                const _current_account = {
                    name: "Bitfinity Wallet",
                    address: principalToAccountIdentifier(id.getPrincipal().toText(), 0),
                };
                walletData.setIdentity(id);
                walletData.setAccount([_current_account]);
                walletData.setCurrentAccount(_current_account);
                walletData.loginAction('bitfinity');
                loginSuccessAction();
            }

        } catch (e) {
            window.Swal.close();
            console.log(e);
        }
    };
    async nnsWallet(){
        this.connectLoading();
        const auth  = await AuthClient.create();
        auth.login({
            maxTimeToLive: 7 * 24 * 60 * 60 * 1000 * 1000 * 1000,
            disableDefaultIdleCallback: true,
            onSuccess: async () => {
                window.Swal.close();
                let pid = await auth.getIdentity();
                const _current_account = {
                    name: "Internet Identity",
                    address: principalToAccountIdentifier(pid.getPrincipal().toString(), 0),
                };
                walletData.setIdentity(pid);
                walletData.setAccount([_current_account]);
                walletData.setCurrentAccount(_current_account);
                walletData.loginAction('nns');
                loginSuccessAction();
            },
            onError: ()=>{
                window.Swal.close();
                console.log('ERROR');
            }
        });
    }
    async getICPTransactions(address){
        return await rosettaApi.getTransactionsByAccount(address).then(ts => {
            if (!Array.isArray(ts)) return null;

            var _ts = [];
            ts.map(_t => {
                if (_t.type !== "TRANSACTION") return false;
                if (_t.status !== "COMPLETED") return false;
                _ts.push({
                    from: _t.account1Address,
                    to: _t.account2Address,
                    amount: Number(_t.amount / config.E8S),
                    fee: Number(_t.fee / config.E8S),
                    hash: _t.hash,
                    timestamp: _t.timestamp,
                    memo: Number(_t.memo),
                });
                return true;
            });
            _ts.reverse();
            return _ts;
        })
    }
    async getCycleBalance(){
        try{
            let user = await _api.authConnect().canister(config.CANISTER_MANAGER_ID).me();
            walletData.setCycleBalance(Number(user.cycle_balance));
        }catch (e) {

        }
    }
    async getCycleRate(){
        let rate = await _api.connect().canister(config.CANISTER_CYCLE_MINTING).get_icp_xdr_conversion_rate();
        let _icpRate = Number(rate.data.xdr_permyriad_per_icp)/10_000;
        walletData.setCycleRate(_icpRate);
    }
    async getMyDeposit(){
        return await _api.authConnect().canister(config.CANISTER_MANAGER_ID).my_deposits();
    }
    async getCycleHistory(){
        return await _api.authConnect().canister(config.CANISTER_MANAGER_ID).cycles_history();
    }
    async logout(){
        window.Swal.fire({
            icon: 'question',
            text: 'Are you sure you want to logout?',
            showCancelButton: true,
            confirmButtonText: 'Yes, Log me out!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("_w_connected");
                localStorage.removeItem("_account_index");
                StoicIdentity.disconnect();
                walletData.setIdentity(false);
                walletData.setAccount([]);
                walletData.setBalance(0);
                walletData.setLoginState(false);
                walletData.setCurrentAccount({});
                walletData.setCanicLockedBalance(0);
                walletData.logoutAction();
            }
        })
    }
    btnLogin() {
        EventBus.emit("showLoginModal", true);
    }
}

export const WalletManager = new walletManager();
export default {
    WalletManager
}