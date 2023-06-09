<script setup>
    import { walletData } from "../../services/store";
    import { useToast } from "vue-toastification";
    import {WalletManager} from "../../services/WalletManager";
</script>
<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus";
    import IconICP from "../icons/IconICP.vue"

    export default {
        components: { VueFinalModal, IconICP },
        data() {
            return {
                buyModal: false,
                canisterImage: null,
                processingFees: 0.1
            }
        },
        methods: {
            async payNow(){
                window.Swal.fire({
                    icon: 'question',
                    html: 'Confirm purchase this canister image: `'+this.canisterImage.name+'` for <IconICP /> '+(this.canisterImage.price+this.processingFees)+'?',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        //Ininital Payment
                    }
                })
            }
        },
        mounted() {
            EventBus.on("showCardModal", obj => {
                console.log(obj)
                this.buyModal = obj.status;
                this.canisterImage = obj.canisterImage;
            });
        }
    }
</script>

<template>
    <VueFinalModal v-model="buyModal" :z-index-base="2000" classes="modal fade show" content-class="modal-dialog modal-xl">
        <div class="modal-content" v-if="canisterImage">
            <a href="#" @click.stop="buyModal=false" class="close" data-bs-dismiss="modal" aria-label="Close">
                <em class="icon ni ni-cross"></em>
            </a>
            <div class="modal-header">
                <h5 class="modal-title">Purchasing canister image: {{canisterImage.name}} <span class="badge bg-outline-primary">{{canisterImage.purchaseType}}</span></h5>
            </div>
            <div class="modal-body">
                    <div class="row gy-4 invoice-bills">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th class="w-150px">Image ID</th>
                                    <th class="w-60">Image Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th class="text-right w-150px">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>IM003054</td>
                                    <td>{{canisterImage.name}} <span class="badge bg-outline-primary">{{canisterImage.purchaseType}}</span></td>
                                    <td>{{canisterImage.price}}.00 <IconICP /></td>
                                    <td>1</td>
                                    <td class="text-right">{{canisterImage.price}}.00 <IconICP /> </td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">Subtotal</td>
                                    <td class="text-right">{{canisterImage.price}}.00 <IconICP /> </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">Processing fee</td>
                                    <td class="text-right">{{processingFees}}0 <IconICP /> </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">Grand Total</td>
                                    <td class="text-right">{{(canisterImage.price+processingFees)}}0 <IconICP /> </td>
                                </tr>
                                </tfoot>
                            </table>
                            <div class="text-right">
                                <button class="btn btn-sm btn-primary text-center" @click="payNow()">Pay Now &nbsp;<em class="icon ni ni-wallet-out"></em></button>
                            </div>
                            <div class="nk-notes ff-italic fs-12px text-soft"> Invoice was created on a computer and is valid without the signature and seal. </div>
                        </div>
                    </div>
            </div>
            <div class="modal-footer bg-light">
                <ul class="btn-toolbar g-4 align-center">
                    <li><a href="javascript:void(0)" @click="buyModal=false" class="link link-primary">Close</a></li>
                </ul>
            </div>
        </div>

    </VueFinalModal>

</template>
<style>
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