<script>
    import ModalManager from "../services/ModalManager";
    import {walletData} from "@/services/store.js";
    import config from "../config";
    import IconLoading from "@/components/icons/IconLoading.vue";
    import {WalletManager} from "../services/WalletManager";

    export default {
        components: { IconLoading },
        data() {
            return{
                config,
                walletData,
                isLoading: false
            }
        },
        methods: {
            showDepositModal(){
                ModalManager.showDeposit(true);
            },
            async refreshBalance(){
                this.isLoading = true;
                await walletData.getBalance();
                await WalletManager.getSettings();
                this.isLoading = false;
            }
        }
    }
</script>
<template>
    <ul class="preview-list">
        <li class="preview-item">
            <em class="icon ni ni-wallet"></em> <small>Your Balance:</small>
        </li>
        <li class="preview-item">
            <span class="badge badge-dot bg-primary">{{Number(walletData?.balance)/config.E8S||"0"}} ICP</span>
        </li>
        <li class="preview-item">
            <span class="badge badge-dot bg-danger">
                {{(Number(walletData?.cycleBalance)/config.CYCLES).toFixed(3)}} T Cycles
            </span>
            <small> &nbsp; <a href="javascript:void(0)" @click="showDepositModal"><em class="icon ni ni-plus-c"></em> Deposit</a></small>
        </li>
        <li class="preview-item">

        </li>
        <li class="preview-item" v-if="!isLoading">
            <small><a href="javascript:void(0)" @click="refreshBalance"><em class="ni ni-reload"></em> Refresh</a></small>
        </li>
        <li class="preview-item" v-if="isLoading">
            <small><a href="javascript:void(0)"><span class="spinner-border spinner-border-sm" role="status"></span> Refreshing...</a></small>
        </li>

    </ul>
</template>