<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus"
    import CanisterManager from "@/services/CanisterManager"
    import config from "@/config"
    import {useToast} from "vue-toastification";
    import { showLoading, isMultiInput, textToPrincipal } from "@/IC/utils.js";
    import Transfer from "./token/Transfer.vue";
    import IconRequired from "../icons/IconRequired.vue";
    import {principalToText} from "../../IC/utils";
    import { ref } from 'vue'
    import {walletData} from "../../services/store";

    export default {
        components: { VueFinalModal, Transfer, IconRequired },
        data() {
            return {
                config,
                topupModal: false,
                icp: ref(0),
                cycles: ref(0)
            }
        },
        methods: {
            calCycleRate(){
                this.cycles = (walletData.cycleRate*this.icp).toFixed(3);
                console.log('ICP:', this.icp, this.cycles, walletData.cycleRate);
            }
        },
        mounted() {
            EventBus.on("showTopupModal", obj => {
                this.topupModal = obj.status;
            });
        },
        setup() {
            const toast = useToast();
            return { toast };
        },
    }
</script>

<template>
    <VueFinalModal v-model="topupModal" :z-index-base="2000" classes="modal fade show" content-class="modal-dialog modal-lg">
            <div class="modal-content">
                <a href="#" @click.stop="topupModal=false" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <em class="icon ni ni-cross"></em>
                </a>
                <div class="modal-header">
                    <h5 class="modal-title">Topup Cycles </h5>
                </div>
                <div class="modal-body pt-3 pb-0">
                    <div class="row gy-4 align-center pb-2">
                        <div class="col-lg-12">
                            <ul class="preview-list">
                                <li class="preview-item">
                                    <em class="icon ni ni-wallet"></em> Your Balance:
                                </li>
                                <li class="preview-item">
                                    <span class="badge badge-dot bg-primary">10.72 ICP</span>
                                </li>
                                <li class="preview-item">
                                    <span class="badge badge-dot bg-danger">3.6T Cycles</span>
                                </li>
                                <li class="preview-item">
                                    <small><a href="javascript:void(0)"><em class="ni ni-reload"></em> refresh</a> </small>
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
                            <em class="icon ni ni-exchange"></em>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <div class="form-text-hint">
                                        <span class="overline-title">Cycles</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Cycles Amount" v-model="cycles" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 pb-2">
                            <p class=" text-danger">
                                <em class="icon ni ni-alert"></em> There is no plan to support withdrawal of funds once a deposit has been made. So please plan ahead and topup responsibly.
                            </p>
                        </div>
                        <div class="col-sm-12 text-center">
                            <button type="submit" class="btn btn-primary btn-block" @click="transfer">
                                <em class="icon ni ni-send"></em> Topup
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="topupModal=false" class="link link-primary">Close</a></li>
                    </ul>
                </div>
        </div>
    </VueFinalModal>

</template>
<style>

</style>