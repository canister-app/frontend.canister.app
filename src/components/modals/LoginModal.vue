<script setup>
    import { walletData } from "../../services/store";
    import { useToast } from "vue-toastification";
    import { StoicIdentity } from "ic-stoic-identity";
    import { AuthClient } from "@dfinity/auth-client";
    import { principalToAccountIdentifier } from "../../IC/utils";
    import config from "../../config";
    import router from "../../router";
    const connectLoading = ()=>{
        window.Swal.fire({
            html: 'Connecting...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                window.Swal.showLoading()
            }
        });
    }
    const redirectToHome = () =>{
        console.log('login success')
        walletData.setModalVisible(false);
        router.push({ path: '/' });
    }
    const _this = this;
    const toast = useToast();
    const useStoic = async() => {
        connectLoading();
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
                redirectToHome();
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
    const usePlug = async () => {
        //Test if the user has Plug extension installed (other way?)
        if (typeof window?.ic?.plug == "undefined") {
            console.log("No plug extension");
            window.Swal.fire({icon: 'error', title: 'Error', text: 'No Plug Wallet extension!'});
            window.open('https://plugwallet.ooo/','_blank');
            return;
        }
        connectLoading();
        const whitelist = config.CANISTER_WHITE_LIST;
        // Host
        const host = "https://boundary.ic0.app/";
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
                redirectToHome();
                // walletData.setCurrentAccountIdx(0);
                // walletData.setLoginState('plug');
                // walletData.getBalance();
                // walletData.getStakingBalance();
                // localStorage.setItem("_w_connected", "plug");
                // walletData.getWalletData();
                // walletData.getXcanicBalance();
                // walletData.updateAccountPrincipal();
                // router.push("/");
            }
        }catch (e) {
            window.Swal.close();
            console.log('PLUG ERROR:', e);
        }

    };
    const useInfinity = async () => {
        if (typeof window?.ic?.infinityWallet == "undefined") {
            console.log("No infinityWallet extension");
            window.Swal.fire({icon: 'error', title: 'Error', text: 'No Infinity Wallet extension!'});
            window.open('https://wallet.infinityswap.one/','_blank');
            return;
        }
        connectLoading();

        // Host
        const host = "https://boundary.ic0.app/";
        const whitelist = config.CANISTER_WHITE_LIST;

        // Make the request
        try {
            const result = await window.ic.infinityWallet.requestConnect({
                whitelist,
                host,
                // timeout: 7 * 24 * 60 * 60 * 1000 * 1000 * 1000
            });

            if(result){
                window.Swal.close();
                const pid = await window.ic.infinityWallet.getPrincipal();
                var id = {
                    type: "infinity",
                    getPrincipal : () => pid
                }
                const _current_account = {
                    name: "Infinity Wallet",
                    address: principalToAccountIdentifier(id.getPrincipal().toText(), 0),
                };
                walletData.setIdentity(id);
                walletData.setAccount([_current_account]);
                walletData.setCurrentAccount(_current_account);
                walletData.loginAction('infinity');
                redirectToHome();
            }

        } catch (e) {
            window.Swal.close();
            console.log(e);
        }
    };

    const useInternetIdentity = async () =>{
        connectLoading();
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
                redirectToHome();
            },
            onError: ()=>{
                window.Swal.close();
                console.log('ERROR');
            }
        });
    }

</script>
<template>
    <div v-if="!walletData.isLogged" class="btn-group-login">

                <a href="javascript:void(0)" @click="useInternetIdentity()" class="btn btn-wider btn-secondary">
                    <img src="/partner/dfinity-logo.png" alt="Internet Identity" class=" wallet-icon-small"> Internet Identity
                </a>

                <a href="javascript:void(0)" @click="usePlug()" class="btn btn-wider btn-light">
                    <img src="/partner/plug-logo.png" alt="Plug" class="wallet-icon-small"> Plug Wallet
                </a>
                <a href="javascript:void(0)" @click="useStoic()" class="btn btn-wider btn-light">
                    <img src="/partner/stoic-logo.png" alt="Stoic" class="wallet-icon-small"> Stoic Wallet
                </a>

                <a href="javascript:void(0)" @click="useInfinity()" class="btn btn-wider btn-light">
                    <img src="/partner/infinitywallet-logo.png" alt="Infinity" class="wallet-icon-small"> Infinity Wallet
                </a>

    </div>
</template>
<style>
    .btn-group-login a{
        margin-top: 20px;
    }
    .btn-group-login img{
        margin-right: 20px;
    }
    .wallet-icon{
        background: #efefef;
        padding: 6px;
    }
    .wallet-icon-small{
        width: 32px;
        float: left;
        border-radius: 100%;
        border-color: #525050;
        background: #e9e9e9;
        padding: 2px;
    }

</style>