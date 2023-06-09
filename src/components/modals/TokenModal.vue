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

    export default {
        components: { VueFinalModal, Transfer, IconRequired },
        data() {
            return {
                config,
                tokenModal: false,
                canisterData: null,
                action: null,
                standard: 'DIP20',
                canisterId: null
            }
        },
        methods: {
        },
        mounted() {
            EventBus.on("showTokenModal", obj => {
                this.tokenModal = obj.status;
                this.standard = obj.standard;
                this.action = obj.action;
                this.canisterData = obj.canisterData;
                this.canisterId = principalToText(obj.canisterId);
            });
        },
        setup() {
            const toast = useToast();
            return { toast };
        },
    }
</script>

<template>
    <VueFinalModal v-model="tokenModal" :z-index-base="2000" classes="modal fade show" content-class="modal-dialog modal-lg">
            <div class="modal-content">
                <a href="#" @click.stop="tokenModal=false" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <em class="icon ni ni-cross"></em>
                </a>
                <div class="modal-header">
                    <h5 class="modal-title"><span class="text-capitalize">{{action}}</span> <span class="text-blue" v-if="canisterData">{{canisterData.symbol}}</span> </h5>
                </div>
                <div class="modal-body pt-3 pb-0">
                    <Transfer v-if="canisterData" :action="action" :canister_id="canisterId" :standard="standard" :symbol="canisterData.symbol" :transfer_fee="canisterData.transfer_fee"></Transfer>
                </div>
                <div class="modal-footer bg-light">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="tokenModal=false" class="link link-primary">Close</a></li>
                    </ul>
                </div>
        </div>
    </VueFinalModal>

</template>
<style>

</style>