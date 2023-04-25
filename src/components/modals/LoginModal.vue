<script setup>
    import { walletData } from "../../services/store";
    import { useToast } from "vue-toastification";
    import {walletManager} from "../../services/WalletManager";
    const toast = useToast();
    const login = async (wallet)=>{
        switch (wallet) {
            case "stoic": await walletManager.stoicWallet()
                break;
            case "plug": await walletManager.plugWallet()
                break;
            case "bitfinity": await walletManager.bitfinityWallet()
                break
            case "nns": await walletManager.nnsWallet()
                break
        }
    }

</script>
<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus";

    export default {
        components: { VueFinalModal },
        data() {
            return {
                loginModal: false
            }
        },
        mounted() {
            EventBus.on("showLoginModal", isOpen => {
                this.loginModal = isOpen;
            });
        }
    }
</script>

<template>
    <VueFinalModal v-model="loginModal" :z-index-base="9000" classes="vue-modal-container" content-class="vue-modal-content">
        <button class="menu-toggler active icon-close modal__close" @click="loginModal=false"><em class="menu-off menu-icon ni ni-cross"></em></button>
        <h5 class="title mb-3">
            Connect your wallet
        </h5>
        <div v-if="!walletData.isLogged" class="btn-group-login">
            <div class="row">
                <div class="col-6">
                    <a href="javascript:void(0)" @click="login('nns')" class="btn no-spacing btn-wider btn-secondary">
                        <img src="/partner/dfinity-logo.png" alt="Internet Identity" class=" wallet-icon-small"> Internet Identity
                    </a>
                </div>
                <div class="col-6">
                    <a href="javascript:void(0)" @click="login('plug')" class="btn no-spacing btn-wider btn-light">
                        <img src="/partner/plug-logo.png" alt="Plug" class="wallet-icon-small"> Plug Wallet
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <a href="javascript:void(0)" @click="login('stoic')" class="btn no-spacing btn-wider btn-light">
                        <img src="/partner/stoic-logo.png" alt="Stoic" class="wallet-icon-small"> Stoic Wallet
                    </a>
                </div>
                <div class="col-6">
                    <a href="javascript:void(0)" @click="login('bitfinity')" class="btn no-spacing btn-wider btn-light">
                        <img src="/partner/bitfinitywallet-logo.png" alt="Infinity" class="wallet-icon-small"> Bitfinity Wallet
                    </a>
                </div>
            </div>

        </div>

        <div class="nk-modal-action justify-end">
            <ul class="btn-toolbar g-4 align-center">
                <li><a href="javascript:void(0)" @click="loginModal=false" class="link link-primary">Close</a></li>
            </ul>
        </div>
    </VueFinalModal>

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
        width: 38px;
        float: left;
        border-radius: 100%;
        border-color: #525050;
        background: #ffffff;
        padding: 2px;
    }

</style>