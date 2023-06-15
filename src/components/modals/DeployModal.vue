<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus"
    import CanisterManager from "@/services/CanisterManager"
    import config from "@/config"
    import {Principal} from "@dfinity/principal";
    import {useToast} from "vue-toastification";
    import {walletData} from "@/services/store";
    import { showLoading, isMultiInput, textToPrincipal } from "@/IC/utils.js";
    import ThresholdForm from "./forms/ThresholdForm.vue";
    import DIP20Form from "./forms/DIP20Form.vue";
    import NftForm from "./forms/NftForm.vue";
    import TokenForm from "./forms/TokenForm.vue";
    import AxonForm from "./forms/AxonForm.vue";
    import IconRequired from "../icons/IconRequired.vue";
    import {principalToText} from "../../IC/utils";
    import { format, unformat } from 'v-money3';
    import ModalManager from "../../services/ModalManager";
    import {WalletManager} from "../../services/WalletManager";
    import Balance from "../Balance.vue";
    const mask_option =  {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false /* doesn't work with directive */,
    };
    const mask_option_fee =  {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 4,
        masked: false /* doesn't work with directive */,
    };
    export default {
        components: { VueFinalModal, DIP20Form, TokenForm, NftForm, ThresholdForm, AxonForm, IconRequired, Balance },
        data() {
            return {
                config,
                walletData,
                deployModal: false,
                canisterImage: null,
                myCanisters: null,
                canisterSelected: "0",
                canisterName: "",
                openedSelect:  false,
            }
        },
        methods: {

            async handleDeploy(e){
                console.log('this.canisterSelected', this.canisterSelected)
                const targetCanister = this.canisterSelected.canister
                const form = e.target
                const formData = new FormData(form) // get all named inputs in form
                let _formData = {};
                let _multiInput = [];
                for (const [inputName, value] of formData) {
                    if(isMultiInput(inputName) == null){
                        if(inputName == 'total_supply'){
                            console.log('total_supply', unformat(value, mask_option));
                            _formData[inputName] = unformat(value, mask_option);
                        }else if(inputName == 'transfer_fee'){
                            console.log('transfer_fee', unformat(value, mask_option_fee));
                            _formData[inputName] = unformat(value, mask_option_fee);
                        }else{
                            _formData[inputName] = value;
                        }

                    }else{
                        _multiInput.push(textToPrincipal(value));//dynamic principal input
                    }
                }
                _formData['principals'] = _multiInput;
                console.log('_formData: ', _formData);
                //Step 0: Confirm
                let _msg = this.canisterSelected =="0"?"Confirm deploy this image to new canister?":"<p>Reinstall canister <strong>"+this.canisterName+"</strong> (<a href='"+config.IC_SCAN+this.canisterSelected+"' target='_blank' title='Check it on IC Scan'>"+this.canisterSelected+"</a> <em class=\"icon ni ni-external\">) </em> with this image?</p><p class='text-danger'>ALERT: THIS ACTION CANNOT BE UNDONE, ALL DATA ON THIS CANISTER WILL BE ERASED!</p>";
                window.Swal.fire({
                    icon: 'question',
                    title: 'Confirmation',
                    html: _msg,
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: '#bbbbbb'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                            //Step 1. Check canister id
                            if(this.canisterSelected == "0"){
                                showLoading('Requesting new canister, please wait...');
                                let _result = await CanisterManager.requestNewCanister(this.canisterName); //request new canister
                                if("ok" in _result){
                                    await this.deploy(principalToText(_result.ok), this.canisterName, "install", _formData)
                                }else{
                                    window.Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: _result.err,
                                    })
                                }
                            }else{
                                console.log('this.canisterSelected: ', this.canisterSelected);
                                await this.deploy(this.canisterSelected, this.canisterName,"reinstall", _formData)
                            }


                        }
                    })
            },
            async deploy(targetCanister, canisterName, installMode, formData){
                let _args = await CanisterManager.createInitParams(formData);
                showLoading('Deploying data to canister <a href="javascript:void(0)">'+targetCanister+'</a>, please wait...');
                try{
                    let result = await CanisterManager.handleDeploy(targetCanister, canisterName, installMode, this.canisterImage.imageId, _args);
                    if("ok" in result){
                        window.Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            html: '<p>Your canister successfully deployed.</p><p>Manage your canister: <a href="/my-canister/'+targetCanister+'">'+targetCanister+'</a></p><p>View on ICScan: <a href="'+config.IC_SCAN+targetCanister+'" target="_blank">'+targetCanister+'</a> <em class="icon ni ni-external"></em>',
                        })
                        await this.getMyCanister();//Reload my canister
                        // await this.refreshBalance();//Reload my balance
                    }else{
                        window.Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: result.err,
                        })
                    }
                }catch (e) {
                    window.Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong, please try again later.',
                    })
                    console.error(e);
                }

            },
            async getMyCanister(){
                this.myCanisters = null;
                this.canisterName = '';
                let _myCanisters = await CanisterManager.getMyCanister();
                let _init = [
                    { canisterId: "-1", canisterLabel: "Request new Canister", heading: true, style: 'text-primary' },
                    { canisterId: "0", heading: false, canisterLabel: "Install to new canister (initialization cycles: "+walletData.canisterPrice+"T)" },
                    { canisterId: "-1", canisterLabel: "Or Re-Install to existed Canister - Becareful!!!", heading: true, style: 'text-danger'}
                ]
                _myCanisters.forEach( cani =>{
                    if(cani.statusCode !=3 ){
                        _init.push(cani);//Push only running canister
                    }

                })
                this.myCanisters = _init;
            },
            setSelected(obj){
                if(obj.canisterId != "0"){ //Get old name
                    this.canisterName = obj.canisterName;
                }else{
                    this.canisterName = '';
                }
            },
            selectableOption( option ) { return option.heading != true; }
        },
        mounted() {
            EventBus.on("showDeployModal", obj => {
                this.deployModal = obj.status;
                this.canisterImage = obj.canisterImage;
                this.getMyCanister();
            });
        },
        setup() {
            const toast = useToast();
            return { toast };
        },
    }
</script>

<template>
    <VueFinalModal v-model="deployModal" :z-index-base="2000" classes="modal fade show" content-class="modal-dialog modal-xl">
            <div class="modal-content">
                <a href="#" @click.stop="deployModal=false" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <em class="icon ni ni-cross"></em>
                </a>
                <div class="modal-header">
                    <h5 class="modal-title" v-if="canisterImage">Deploy canister with <span class="text-blue">{{canisterImage.name}}</span> image</h5>
                </div>
                <div class="modal-body pt-3" v-if="canisterImage">
                    <form @submit.prevent="handleDeploy" class="mb-0">
                        <div class="pl-10">
                            <div class="row gy-4">
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label class="form-label text-danger">
                                            Choose canister ID <IconRequired /> &nbsp;
                                            <button type="button" class="btn btn-xs btn-light" @click.stop="getMyCanister">Refresh <i class="icon ni ni-reload"></i></button>
                                        </label>
                                        <div class="form-control-wrap">
                                            <v-select :getOptionKey="canister => canister.canisterId" v-model="canisterSelected" :reduce="canister => canister.canisterId" label="canisterLabel" :options="myCanisters" :clearable="false" @option:selected="setSelected" :selectable="selectableOption" v-if="myCanisters" >
                                                <template #option="{ canisterLabel, style, heading, canisterId }" :getOptionKey="canisterId" >
                                                    <p v-if="heading" :class="`mb-0 ${style}`">{{ canisterLabel }}</p>
                                                    <span v-else :class="`ms-3 fs-13px ${style}`">{{ canisterLabel }}</span>
                                                </template>
                                            </v-select>
<!--                                            <select class="form-select" name="canister_id" v-if="myCanisters">-->
<!--                                                <option value="0">Install to new canister (initialization fee will apply)</option>-->
<!--                                                <optgroup label="Reinstall to existed canister - Danger!!!">-->
<!--                                                    <option :value="canister.canisterId" v-for="canister in myCanisters">-->
<!--                                                        {{canister.canisterName}}: {{canister.canisterId}} ({{canister.status}})-->
<!--                                                    </option>-->
<!--                                                </optgroup>-->
<!--                                            </select>-->
                                            <div v-else class="form-select">
                                                <span class="spinner-border spinner-border-sm" role="status"></span> Loading your canisters...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="form-label" for="canister_name">Custom canister name: <IconRequired /></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" id="canister_name" v-model="canisterName" placeholder="Ex: Canister for ICRC Token">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-1" v-if="canisterSelected != 0">
                                <div class="col-sm-12">
                                    <div class="alert alert-fill alert-warning alert-icon">
                                        <em class="icon ni ni-alert-circle"></em>
                                        You are choosing to reinstall on the <strong>existed</strong> canister. This action will delete all existing data on this canister and replace it with a fresh install of this image. Check your canister <a :href="config.IC_SCAN+canisterSelected" class="alert-link" target="_blank">{{canisterSelected}}</a> <em class="icon ni ni-external"></em> on IC Scan again for make sure you know what you're doing!
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-1" v-else>
                                <div class="col-sm-12">
                                    <div class="alert alert-fill alert-light p-1">
                                        <Balance />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="preview-hr mb-3 mt-3">
                        <TokenForm v-if="canisterImage.code =='ICRC1'"></TokenForm>
                        <DIP20Form v-if="canisterImage.code =='DIP20'"></DIP20Form>
                        <NftForm v-else-if="canisterImage.code == 'EXT-NFT'"></NftForm>
                        <ThresholdForm v-else-if="canisterImage.code == 'Threshold'"></ThresholdForm>
                        <AxonForm v-else-if="canisterImage.code == 'Axon'"></AxonForm>

                        <div class="pl-10">
                            <div class="row gy-4">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-block">
                                        Start Deploy &nbsp; <em class="icon ni ni-upload-cloud"></em>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>


                </div>
                <div class="modal-footer bg-light">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="deployModal=false" class="link link-primary">Close</a></li>
                    </ul>
                </div>
        </div>
    </VueFinalModal>

</template>
<style>

</style>