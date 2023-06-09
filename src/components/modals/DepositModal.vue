<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus"
    import CanisterManager from "@/services/CanisterManager"
    import config from "@/config"
    import {useToast} from "vue-toastification";
    import { getSubAccountArray, showLoading, showSuccess, showError } from "@/IC/utils.js";
    import Transfer from "./token/Transfer.vue";
    import IconRequired from "../icons/IconRequired.vue";
    import {principalToText} from "../../IC/utils";
    import { ref } from 'vue'
    import {walletData} from "../../services/store";
    import _api from "@/IC/api";

    export default {
        components: { VueFinalModal, Transfer, IconRequired },
        data() {
            return {
                config,
                walletData,
                depositModal: false,
                icp: ref(0),
                cycles: ref(0),
                cycleBalance: null
            }
        },
        methods: {
            calCycleRate(){
                this.cycles = (walletData.cycleRate*this.icp).toFixed(3);
            },
            async getCycleBalance(){
                this.cycleBalance = null;
                try{
                    this.cycleBalance = await _api.authConnect().canister(config.CANISTER_MANAGER_ID).me();
                    await walletData.getBalance();
                }catch (e) {
                    console.log('Error:', e)
                }
            },
            async depositICP(){
                //Step1: Register
                console.log('aaa', this.icp, walletData.balance/config.E8S)
                if(this.icp <= 0) {
                    showError("Please enter a valid deposit amount!"); return;
                }else if(this.icp <= config.MIN_DEPOSIT/config.E8S) {
                    showError("Min deposit amount is: "+config.MIN_DEPOSIT/config.E8S+" ICP"); return;
                }
                else if(this.icp > walletData.balance/config.E8S){
                    showError("Your ICP balance is insufficient!");return;
                }
                window.Swal.fire({
                    icon: 'question',
                    title: 'Confirmation',
                    html: 'Are you sure you want to deposit <strong>'+this.icp+'</strong> ICP from your wallet?',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: '#bbbbbb'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let ping_args = {
                            from_account: walletData.account.address,
                            to_account: this.cycleBalance.account,
                            amount: this.icp*config.E8S
                        }
                        showLoading('Step 1/3: Registering transaction...');

                        let _transIdx = await _api.authConnect().canister(config.CANISTER_MANAGER_ID).deposit_ping(ping_args);
                        console.log('done step1: ', _transIdx)
                        //Step 2: Transfer ICP
                        let args = {
                            from_subaccount: [getSubAccountArray(walletData.currentAccount)],
                            to: this.cycleBalance.account,
                            amount: { "e8s": this.icp*config.E8S },
                            fee: { "e8s": 10_000 },
                            memo: 0,
                            created_at_time: []
                        }
                        showLoading('Step 2/3: Depositing ICP...');
                        let transICP = await _api.authConnect().canister(config.LEDGER_CANISTER_ID).send_dfx(args);
                        console.log('done step2: ', transICP)
                        //Step 3: Process
                        showLoading('Step 3/3: Finalizing the transaction...');
                        let result = await _api.authConnect().canister(config.CANISTER_MANAGER_ID).deposit_process(Number(_transIdx.ok));
                        console.log('done step3: ', result)
                        if("ok" in result){
                            showSuccess("Deposit cycles successful")
                            await this.getCycleBalance();
                        }else{
                            showError("Error: "+result.err)
                        }
                    }
                })


            }
        },
        mounted() {
            EventBus.on("showDepositModal", obj => {
                this.depositModal = obj.status;
                this.getCycleBalance();
            });
        },
        setup() {
            const toast = useToast();
            return { toast };
        },
    }
</script>

<template>
    <VueFinalModal v-model="depositModal" :z-index-base="2000" classes="modal fade show" content-class="modal-dialog modal-lg">
            <div class="modal-content">
                <a href="#" @click.stop="depositModal=false" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <em class="icon ni ni-cross"></em>
                </a>
                <div class="modal-header">
                    <h5 class="modal-title">Deposit Cycles </h5>
                </div>
                <div class="modal-body pt-3 pb-0">
                    <div class="row gy-4 align-center pb-2">
                        <div class="col-lg-12">
                            <ul class="preview-list">
                                <li class="preview-item">
                                    <em class="icon ni ni-wallet"></em> Your Balance:
                                </li>
                                <li class="preview-item">
                                    <span class="badge badge-dot bg-primary">{{walletData?.balance/config.E8S||"-"}} ICP</span>
                                </li>
                                <li class="preview-item">
                                    <span class="badge badge-dot bg-danger">{{(Number(walletData?.cycleBalance)/config.CYCLES).toFixed(4)}} T Cycles</span>
                                </li>
                                <li class="preview-item">
                                    <small><a href="javascript:void(0)" @click="getCycleBalance"><em class="ni ni-reload"></em> refresh</a> </small>
                                </li>

                            </ul>

                        </div>
                    </div>
                    <div class="row gy-4 align-center  pb-2">
                        <div class="col-lg-5">
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <div class="form-text-hint">
                                        <span class="overline-title">ICP</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="ICP Amount" v-model="icp" @keyup="calCycleRate">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 text-center">
                            <em class="icon ni ni-arrow-right"></em>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <div class="form-text-hint">
                                        <span class="overline-title">Cycles</span>
                                    </div>
                                    <input type="text" class="form-control text-danger" placeholder="Cycles Amount" v-model="cycles" readonly>
                                </div>
                            </div>
                        </div>
<!--                        <div class="col-12 pb-2">-->
<!--                            <p class=" text-danger">-->
<!--                                <em class="icon ni ni-alert"></em> You can't withdrawal of your funds once a deposit has been made!-->
<!--                            </p>-->
<!--                        </div>-->
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-primary btn-block" @click="depositICP">
                                <em class="icon ni ni-plus-fill-c"></em> Deposit
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="depositModal=false" class="link link-primary">Close</a></li>
                    </ul>
                </div>
        </div>
    </VueFinalModal>

</template>
<style>

</style>