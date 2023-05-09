<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus"
    import CanisterManager from "@/services/CanisterManager"
    import config from "@/config"
    import {Principal} from "@dfinity/principal";
    import {useToast} from "vue-toastification";
    import { showLoading, isMultiInput, textToPrincipal } from "@/IC/utils.js";
    import ThresholdForm from "./forms/ThresholdForm.vue";
    import NftForm from "./forms/NftForm.vue";
    import TokenForm from "./forms/TokenForm.vue";
    import AxonForm from "./forms/AxonForm.vue";
    import IconRequired from "../icons/IconRequired.vue";
    import {principalToText} from "../../IC/utils";
    export default {
        components: { VueFinalModal, TokenForm, NftForm, ThresholdForm, AxonForm, IconRequired },
        data() {
            return {
                deployModal: false,
                canisterImage: null,
                myCanisters: null,
            }
        },
        methods: {
            async handleDeploy(e){
                const form = e.target
                const formData = new FormData(form) // get all named inputs in form
                let _formData = {};
                let _multiInput = [];
                for (const [inputName, value] of formData) {
                    if(isMultiInput(inputName) == null){
                        _formData[inputName] = value;
                    }else{
                        _multiInput.push(textToPrincipal(value));//dynamic principal input
                    }
                }
                _formData['principals'] = _multiInput;
                console.log('_formData: ', _formData);
                //Step 0: Confirm
                let _msg = _formData.canister_id =="0"?"Confirm install this image to new canister?":"<p>Reinstall canister <a href='"+config.IC_SCAN+_formData.canister_id+"' target='_blank' title='Check it on IC Scan'>"+_formData.canister_id+"</a> <em class=\"icon ni ni-external\"></em> with this image?</p><p class='text-danger'>ALERT: THIS ACTION CANNOT BE UNDONE, ALL DATA ON THIS CANISTER WILL BE ERASED!</p>";
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
                            if(_formData.canister_id == "0"){
                                showLoading('Requesting new canister, please wait...');
                                let _result = await CanisterManager.requestNewCanister(_formData.canister_name); //request new canister
                                console.log('create canister', _result)
                                if("ok" in _result){
                                    await this.deploy(principalToText(_result.ok), "install", _formData)
                                }else{
                                    window.Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: _result.err,
                                    })
                                }
                            }else{
                                await this.deploy(_formData.canister_id, "reinstall", _formData)
                            }


                        }
                    })
            },
            async deploy(targetCanister, installMode, formData){
                let _args = await CanisterManager.createInitParams(formData);
                // let targetCanister = "be2us-64aaa-aaaaa-qaabq-cai";
                console.log('targetCanister: ', targetCanister);
                showLoading('Deploying data to canister <a href="javascript:void(0)">'+targetCanister+'</a>, please wait...');

                let result = await CanisterManager.handleDeploy(targetCanister, installMode, this.canisterImage.imageId, _args);
                console.log('result: ', result);
                if("ok" in result){
                    window.Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        html: '<p>Your canister successfully deployed.</p><p>Canister ID: <a href="http://127.0.0.1:8000/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id='+targetCanister+'" target="_blank">'+targetCanister+'</a> <em class="icon ni ni-external"></em>',
                    })
                }else{
                    window.Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.err,
                    })
                }
            },
            async getMyCanister(){
                this.myCanisters = null;
                let _myCanisters = await CanisterManager.getMyCanister();
                this.myCanisters = _myCanisters.map( cani =>{
                    let _status = "---";
                    switch(Number(cani[1].status)){
                        case 1: _status = "Running";break;
                        case 2: _status = "Stoped";break;
                        case 3: _status = "Deleted";break;
                        default: _status = "Ready";break;
                    }
                    return {
                        idx: cani[0],
                        canisterId: principalToText(cani[1].canisterId),
                        canisterName: cani[1].canisterName,
                        status: _status,
                        owner: principalToText(cani[1].owner),
                        imageId: Number(cani[1].imageId),
                    }
                })
                console.log('this.myCanisters: ', this.myCanisters)
            }
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
                    <form @submit.prevent="handleDeploy">
                        <div class="pl-10">
                            <div class="row gy-4">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="form-label text-danger">
                                            Choose canister ID  <IconRequired /> &nbsp;
                                            <button type="button" class="btn btn-xs btn-light" @click.stop="getMyCanister">Refresh <i class="icon ni ni-reload"></i></button>
                                        </label>
                                        <div class="form-control-wrap">
                                            <select class="form-select" name="canister_id" v-if="myCanisters">
                                                <option value="0">Install to new canister (initialization fee will apply)</option>
                                                <optgroup label="Reinstall to existed canister - Danger!!!">
                                                    <option :value="canister.canisterId" v-for="canister in myCanisters">
                                                        {{canister.canisterName}}: {{canister.canisterId}} ({{canister.status}})
                                                    </option>
                                                </optgroup>
                                            </select>
                                            <div v-else class="form-select">
                                                <span class="spinner-border spinner-border-sm" role="status"></span> Loading your canisters...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="form-label" for="canister_name">Custom canister name: <IconRequired /></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" id="canister_name" name="canister_name" placeholder="Ex: Canister for ICRC Token">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="preview-hr">
                        <TokenForm v-if="canisterImage.category ==0"></TokenForm>
                        <NftForm v-else-if="canisterImage.category == 1"></NftForm>
                        <ThresholdForm v-else-if="canisterImage.category == 2"></ThresholdForm>
                        <AxonForm v-else-if="canisterImage.category == 3"></AxonForm>

                        <div class="pl-10 pt-3">
                            <div class="row gy-4">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary">
                                        Deploy &nbsp; <em class="icon ni ni-upload-cloud"></em>
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn btn-danger">
                                        Start over &nbsp; <em class="icon ni ni-reload"></em>
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