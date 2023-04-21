<script>
  import { RouterLink, RouterView } from 'vue-router'
  import HeaderView from './views/layout/HeaderView.vue'
  import FooterView from './views/layout/FooterView.vue'
  import { walletData } from "@/services/store";
  import { StoicIdentity } from "ic-stoic-identity";
  import { AuthClient } from "@dfinity/auth-client";
  import {principalToAccountIdentifier} from "./IC/utils.js";
  import config from "./config";

  export default {
    components: {HeaderView, FooterView},
    data(){
      return{
        walletData,
        loginModal: false,
      }
    },
    methods: {
      showLogin(){
        this.loginModal = true;
      },
      logoutAction(){
        localStorage.removeItem("_w_connected");
        StoicIdentity.disconnect();
        walletData.setIdentity(false);
        walletData.setAccount([]);
        walletData.setBalance(0);
        walletData.setLoginState(false);
        walletData.setCurrentAccount({});
        walletData.logoutAction();
      },
    },
    created() {
      //Init
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
                console.log('check 11111111 timee')
                if (!window.ic.plug.agent) {
                  await window.ic.plug.createAgent({
                    whitelist: config.CANISTER_WHITE_LIST,
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
      }else{
        // logout();//Logout
      }

    },
  }
</script>

<template>
  <div class="nk-app-root">
    <div class="nk-wrap">
      <HeaderView />
        <RouterView />
      <FooterView />
    </div>
  </div>
</template>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  @media only screen and (max-width : 480px) {
    .vue-modal-content {
      min-width: 99% !important;
    }
  }
  .vue-modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vue-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    min-width: 600px;
    max-height: 450px;
  }
  .modal__title {
    margin: 0 2rem 0 0;
    font-weight: 700;
  }
  .modal__content{
    flex-grow: 1;
    overflow-y: auto;
    margin-top: 1.25em;
    margin-bottom: 1.25em;

  }
  .modal__close {
    position: absolute;
    top: 0.5rem;
    border: none;
    background: none;
    right: 0.5rem;
  }
  .nk-fmg{
    height:100vh;
  }
</style>
