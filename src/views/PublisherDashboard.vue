<script setup>
    import config from "@/config";
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

</script>
<script>
    import { walletData } from "@/services/store";
    import { textToPrincipal, principalToText } from "../IC/utils.js";
    import _apiHandler from "@/IC/api";
    import {useToast} from "vue-toastification";
    import { IDL } from "@dfinity/candid";
    import moment from "moment";
    import CanisterManager from "@/services/CanisterManager";
    import {Principal} from "@dfinity/principal";
    import {init} from "@/IC/candid/icrc1.did.js"
    import { QuillEditor } from '@vueup/vue-quill'

    const MAX_CHUNK_SIZE = 1024 * 1024 * 1.9; // 1.9MB

    export default {
        name: 'AppFaucet',
        props: ['logout'],
        components: {QuillEditor },
        data() {
            return {
                api: null,
                moment,
                installArgument: "psh4l-7qaaa-aaaap-qasia-cai",
                categories: [], //List template category
                templates: [], //List template
                template_name: '',
                template_description: '',
                template_price: 0,
                template_community: '',
                template_brief: '',
                template_code: '',
                template_category: '',
                template_repo: '', //Github
                members: [],
                canisters: [],
                proposals: [],
                proposalText: '',
                selectList: 'installCode',
                targetCanister: 'r7inp-6aaaa-aaaaa-aaabq-cai',
                canister_template: '',
                chunks: null,
                wasmModule: null,
                CHUNKSIZE: 1024 * 1024 * 1.9,
            }
        },
        setup() {
            const toast = useToast();
            return { toast };
        },
        methods: {
            showLoading(html){
                window.Swal.fire({
                    html: html,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        window.Swal.showLoading()
                    }
                });
            },
            async editTemplate(template){
                this.$refs.templateModal.showModal(template);
            },
            async canisterAction(target, action){
                this.showLoading(action+'ing...');
                let targetCanister = target.replace('\t','');
                try{
                    let _owner = Principal.fromText("2vxsx-fae");
                    console.log('installing...............', targetCanister)
                    let formData = {
                        token_standard: "ICRC-1",
                        token_name: "New ICRC Token",
                        token_symbol: "NEW ICRC",
                        transfer_fee: 0,
                        token_owner: "lekqg-fvb6g-4kubt-oqgzu-rd5r7-muoce-kppfz-aaem3-abfaj-cxq7a-dqe"
                    }
                    let _args = await CanisterManager.createInitParams(formData);
                    console.log('image id: ', this.canister_template);
                    console.log('_arg: ', _args);
                    console.log('targetCanister: ', this.targetCanister);
                    let result = await this.api.canister(config.CANISTER_MANAGER_ID).canister_control(Principal.fromText(targetCanister), action, Number(this.canister_template), _args);
                    console.log('result: ', result);
                    this.toast.success(action+" success");
                    window.Swal.close();
                }catch (e) {
                    console.log('e: ', e);
                    window.Swal.fire({icon: 'error', title: 'Error', html: JSON.stringify(e)});
                }

            },
            async getMembers(){
                this.members = await this.api.canister(config.CANISTER_MANAGER_ID).get_admins();
            },
            async deleteTemplate(template){
                window.Swal.fire({
                    icon: 'question',
                    text: 'Warning: Are you sure you want to delete this template?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, I am sure!',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let _deleted = await this.api.canister(config.CANISTER_MANAGER_ID).delete_templates(template.template_id);
                        console.log('_deleted: ', _deleted);
                        window.Swal.fire({icon: 'success', title: 'Success', text: 'Template: `'+template.template.name+'` has been deleted!'});
                    }
                });
            },
            async createTemplate(){
                window.Swal.fire({
                    icon: 'question',
                    text: 'Are you sure you want to create new canister template?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, I am sure!',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        this.showLoading('Creating new canister template...');
                        console.log("Clear uploaded!");
                        await this.api.canister(config.CANISTER_MANAGER_ID).upload_clear();
                        console.log("Completed!");
                        const encodeArrayBuffer = (file) => Array.from(new Uint8Array(file));
                        let chunk = 1;
                        for (
                            let byteStart = 0;
                            byteStart < this.wasmModule.size;
                            byteStart += MAX_CHUNK_SIZE, chunk += 1
                        ) {
                            let fileSlice = this.wasmModule.slice(byteStart, Math.min(this.wasmModule.size, byteStart + MAX_CHUNK_SIZE), this.wasmModule.type);
                            let fileSliceBuffer = (await fileSlice.arrayBuffer()) || new ArrayBuffer(0);
                            let sliceToNat = encodeArrayBuffer(fileSliceBuffer);
                            console.log('Uploading chunk: ',chunk);
                            await this.api.canister(config.CANISTER_MANAGER_ID).upload([sliceToNat]);
                        }
                        let _imageObj = {
                            name: this.template_name,
                            thumbnail: [],
                            code: this.template_code,
                            repo: this.template_repo,
                            category: this.template_category,
                            description: this.$refs.myEditor.getHTML(),
                            brief: this.template_brief,
                            price: this.template_price,
                            metadata: []
                        }
                        console.log('_imageObj: ', _imageObj);
                        let _template = await this.api.canister(config.CANISTER_MANAGER_ID).add_canister_image(_imageObj);
                        this.getTemplates();//Refresh template
                        window.Swal.fire({icon: 'success', title: 'Success', text: 'Canister template created!'});
                    }
                })
            },
            async createCanister(){
                window.Swal.fire({
                    icon: 'question',
                    text: 'Are you sure you want to create new Canister?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, I am sure!',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        this.showLoading('Creating new canister...');
                        let _result = await this.api.canister(config.CANISTER_MANAGER_ID).create_new_canister();
                        this.getCanisters();
                        window.Swal.fire({icon: 'success', title: 'Success', text: 'Canister Id: '+_result.ok+' created!'});
                    }
                })
            },
            async getCanisters(){
                let _canisters = await this.api.canister(config.CANISTER_MANAGER_ID).get_canisters();
                this.canisters = _canisters.map( cani =>{
                    var _status = "---";
                    switch(Number(cani[1].status)){
                        case 1: _status = "Running";break;
                        case 2: _status = "Stoped";break;
                        case 3: _status = "Deleted";break;
                        default: _status = "Ready";break;
                    }
                    return {
                        idx: cani[0],
                        canisterId: principalToText(cani[1].canisterId),
                        status: _status,
                        owner: principalToText(cani[1].owner),
                    }
                })
            },
            async getCategory(){
                let _category = await this.api.canister(config.CANISTER_MANAGER_ID).get_categories();
                this.categories = _category.map( cate => {
                    return {
                        category_id: cate[0],
                        name: cate[1].name,
                    };
                });
            },
            async getTemplates(loading){

                let _template = await this.api.canister(config.CANISTER_MANAGER_ID).get_images();
                this.templates = _template.map( cate => {
                    return {
                        template_id: cate[0],
                        template: cate[1],
                    };
                });
                window.Swal.close();
            },
            async handleFileUpload(event ){
                const file = event.target.files[0];
                this.wasmModule = file;

                ///
                return;
                this.chunks = null;
                const fr = new FileReader();
                fr.readAsArrayBuffer(file);
                fr.addEventListener('loadend', (e) => {
                    let aa = e.target.result;
                    this.chunks = new Uint8Array(aa);
                })
            },
            getBuffer(file, callback){
                var reader = new FileReader();
                let fileData = new Blob([file]);
                reader.readAsArrayBuffer(file);
                reader.onload = function() {
                    var arrayBuffer = reader.result;
                    var bytes = new Uint8Array(arrayBuffer);
                    callback(bytes);
                }
            },
            async createProposal() {
                console.log('Action: ', this.selectList);
                let _rs = await this.canisterAction(this.targetCanister, this.selectList);
                console.log('rs: ', _rs);
            },
            setModalVisible(){
                walletData.setModalVisible(true);
            },
            goBack(){
                this.$router.back();
            }
        },
        mounted() {
            this.api = _apiHandler.connect(config.IC_ENDPOINT);
            this.getMembers();
            this.getCategory();
            this.getTemplates();
            this.getCanisters();
            window.scrollTo(0, 0);
        },
    }
</script>
<template>
    <div class="container-fluid">
        <div class="nk-content-inner">
            <div class="nk-content-body">
                <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-between g-3">
                        <div class="nk-block-head-content">
                            <h3 class="nk-block-title page-title">Publisher Dashboard</h3>
                            <div class="nk-block-des text-soft">
                                <p>Publish your images.</p>
                            </div>
                        </div><!-- .nk-block-head-content -->
                        <div class="nk-block-head-content">
                            <div class="toggle-wrap nk-block-tools-toggle">
                                <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a>
                                <div class="toggle-expand-content" data-content="pageMenu">
                                    <ul class="nk-block-tools g-3">
                                        <li><router-link to="/store" class="btn btn-primary"><em class="icon ni ni-plus"></em><span>Create new</span></router-link></li>
                                    </ul>
                                </div>
                            </div>
                        </div><!-- .nk-block-head-content -->
                    </div><!-- .nk-block-between -->
                </div><!-- .nk-block-head -->

                <div class="nk-block">
                    <div class="card card-bordered card-stretch">
                        <div class="card-inner-group">
                            <div class="card-inner">
                                <div class="row">
                                    <div class="col-lg-12 mx-auto">
                                        <div class="create-content-box">
                                            <div class="create-content-box">
                                                <ul class="nav nav-tabs nav-tabs-s1" id="myTab" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="on-sale" aria-selected="true"><span class="ni ni-block-over"></span> Overview </button>
                                                    </li>
                                                    <li class="nav-item " role="presentation">
                                                        <button class="nav-link" id="template-tab" data-bs-toggle="tab" data-bs-target="#template" type="button" role="tab" aria-controls="owned" aria-selected="false"><span class="ni ni-box"></span> Canister Template </button>
                                                    </li>
                                                    <li class="nav-item " role="presentation">
                                                        <button class="nav-link" id="canister-tab" data-bs-toggle="tab" data-bs-target="#canister" type="button" role="tab" aria-controls="owned" aria-selected="false"><span class="ni ni-box"></span> Canister Manager </button>
                                                    </li>

                                                </ul>
                                                <div class="gap-2x"></div>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                                        <div class=" mt-2">
                                                            <h5 class="sub-title">Manage admin:</h5>
                                                            <input class="form-control input-sm mb-2" id="input_member" placeholder="input principal here" size=60 />
                                                            <button id="btn_add_member" class="btn btn-sm btn-info">Add member</button> <button id="btn_del_member" class="btn btn-sm btn-danger">Delete member</button>
                                                        </div>
                                                        <div class="form-item mt-2">
                                                            <h5 class="sub-title">Admin List:</h5>
                                                            <button @click="getMembers" class="btn btn-sm btn-outline-secondary mb-2">Refresh</button>
                                                            <section id="members"></section>
                                                            <ul>
                                                                <li v-for="(member, idx) in members" v-bind:key="idx">
                                                                    {{member}}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        ------------------------------------------------------------------


                                                    </div>

                                                    <div class="tab-pane fade show" id="template" role="tabpanel" aria-labelledby="template-tab">
                                                        <div class="form-item mt-2">
                                                            <section>
                                                                <h5 class=" mb-2">Canister Images:</h5>
                                                                <button class="btn btn-sm btn-outline-secondary" @click="getTemplates">Refresh</button>
                                                            </section>
                                                            <section>
                                                                <table class="table table-sm">
                                                                    <thead>
                                                                    <tr><th>#</th><th>Code / Name / Description</th><th>Action</th></tr>
                                                                    </thead>
                                                                    <tbody v-if="templates">
                                                                    <tr v-for="(template, idx) in templates" v-bind:key="idx">
                                                                        <td>{{template.template_id}}.</td>
                                                                        <td>
                                                                            <span :class="`standard_format format_default label-token ${config.CANISTER_IMAGE_CATEGORY[template.template.category]}`">{{config.CANISTER_IMAGE_CATEGORY[template.template.category]}}</span> {{template.template.code}} / {{template.template.name}}
                                                                            <div class="small">
                                                                                {{template.template.brief}}</div>
                                                                            <div class="small">Created: {{moment(Number(template.template.time)/1000000).format("lll")}}</div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="btn-group" role="group" aria-label="Action">
                                                                                <button class="btn btn-sm btn-warning" @click="editTemplate(template)">Edit</button>
                                                                                <button class="btn btn-sm btn-danger" @click="deleteTemplate(template)">Delete</button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </section>
                                                        </div>
<hr>
                                                        <div class="pt-3">
                                                            <h5>Create new canister image:</h5>
                                                            <div class="form-item mb-4">
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Image Name:</label>
                                                                    <input type="text" class="form-control form-control-s1" placeholder="Template name..." v-model="template_name" required>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Image Code:</label>
                                                                    <input type="text" class="form-control form-control-s1" placeholder="ICRC-1" v-model="template_code" required>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Price:</label>
                                                                    <input type="text" class="form-control form-control-s1" placeholder="Set 0 for free" v-model="template_price" required>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Image Repo:</label>
                                                                    <input type="text" class="form-control form-control-s1" placeholder="github.com" v-model="template_repo" required>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Image Category:</label>
                                                                    <select v-model="template_category" class="form-control">
                                                                        <option v-for="(cat, idx) in categories" v-bind:key="idx" :value="cat.category_id" :selected="cat.category_id == 0">{{cat.name}}</option>
                                                                    </select>
                                                                </div>
                                                                <div class="mb-3">
                                                                    Wasm file : <input type="file" class="form-control input-sm" id="file"  @change="handleFileUpload( $event )" />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Brief:</label>
                                                                    <textarea name="brief" rows="1" class="form-control" placeholder="Short intro..." v-model="template_brief" required></textarea>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label class="mb-2 form-label">Description:</label>
                                                                    <div class="card">
                                                                    <QuillEditor ref="myEditor" theme="snow" />
                                                                    </div>
                        <!--                                            <textarea name="message" rows="2" class="form-control form-control-s1" placeholder="About this template - WASM module..." v-model="template_description" required></textarea>-->
                                                                </div>

                                                                <button class="btn btn-sm btn-danger mb-2" @click="createTemplate">Create Image</button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="tab-pane fade" id="canister" role="tabpanel" aria-labelledby="canister-tab">


                                                        <div class="">
                                                            <h5>Create a new canister: </h5>
                                                            <button id="btn_create_canister" class="btn btn-sm btn-danger" @click="createCanister">Request New Canister</button>
                                                        </div>
                                                        <div class="form-item mt-2">
                                                            <h5>Canister control:</h5>
                                                            <!--                <div>-->
                                                            <!--                  Proposal content : <input class="form-control input-sm" id="input_proposal_text" v-model="proposalText" placeholder="input proposal content" size=30 />-->
                                                            <!--                </div>-->
                                                            <div class="mt-2">
                                                                Action :
                                                                <select v-model="selectList" class="form-control" required>
                                                                    <option value="install" selected>Install Code</option>
                                                                    <option value="reinstall" selected>Re-Install Code</option>
                                                                    <option value="start">Start</option>
                                                                    <option value="stop">Stop</option>
                                                                    <option value="delete">Delete</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                Template :
                                                                <select v-model="canister_template" class="form-control" required>
                                                                    <option v-for="(template, idx) in templates" v-bind:key="idx" :value="template.template_id">{{template.template.name}}</option>
                                                                </select>
                                                            </div>
                                                            <!--                <div>-->
                                                            <!--                  Wasm file : <input type="file" class="form-control input-sm" id="file"  @change="handleFileUpload( $event )" />-->
                                                            <!--                </div>-->
                                                            <div class="mb-2">
                                                                Install Argument : <input class="form-control input-sm" v-model="installArgument" placeholder="principal aaaaa-aa" size=60 />
                                                            </div>
                                                            <div class="mb-2">
                                                                Target Canister : <input class="form-control input-sm" v-model="targetCanister" placeholder="input target canister" size=60 required />
                                                            </div>
                                                            <button class="btn btn-sm btn-danger mb-2" @click="createProposal">Excute</button>
                                                        </div>
                                                        <div class="form-item mt-2">
                                                            <section>
                                                                <h5 class=" mb-2">Canister List:</h5>
                                                                <button id="refresh_canister" class="btn btn-sm btn-outline-secondary" @click="getCanisters">Refresh canisters</button>
                                                            </section>
                                                            <section>
                                                                <table class="table table-sm">
                                                                    <thead>
                                                                    <tr><th>#</th><th>Canister</th><th>Status</th><th>Action</th></tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="(canister, idx) in canisters" v-bind:key="idx">
                                                                        <td>{{canister.idx}}.</td>
                                                                        <td>{{canister.canisterId}}</td>
                                                                        <td>
                                                                            {{canister.status}}
                                                                        </td>
                                                                        <td>
                                                                            <div class="btn-group" role="group" aria-label="Action">
                                                                                <button class="btn btn-sm btn-outline-secondary" @click="canisterAction(canister.canisterId, 'installCode')">Install</button>
                                                                                <button class="btn btn-sm btn-outline-secondary" @click="canisterAction(canister.canisterId, 'start')">Start</button>
                                                                                <button class="btn btn-sm btn-warning" @click="canisterAction(canister.canisterId, 'stop')">Stop</button>
                                                                                <button class="btn btn-sm btn-danger" @click="canisterAction(canister.canisterId, 'delete')">Delete</button>
                                                                            </div>

                                                                        </td></tr>
                                                                    </tbody>
                                                                </table>
                                                            </section>
                                                        </div>
                                                        ------------------------------------------------------------------
                                                    </div>
                                                </div>



                                                <!--              <div class="form-item mt-2">-->
                                                <!--                <h5>Proposal List:</h5>-->
                                                <!--                &lt;!&ndash;<button id="refresh_proposal" style="float:right">refresh proposals</button>&ndash;&gt;-->
                                                <!--                &lt;!&ndash;<button id="btn_create_proposal" style="float:right">Initiate a proposal</button>&ndash;&gt;-->
                                                <!--                <ul>-->
                                                <!--                  <li v-for="(proposal, idx) in proposals" v-bind:key="idx">-->
                                                <!--                    <table class="table table-sm">-->
                                                <!--                      <tbody>-->
                                                <!--                        <tr> <td>proposal_id</td> <td>{{proposal.proposal_id}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_content</td> <td>{{proposal.proposal_content}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_maker</td> <td>{{proposal.proposal_maker}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_approvers</td> <td>{{proposal.proposal_approvers}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_completed</td> <td>{{proposal.proposal_completed}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_total</td> <td>{{proposal.proposal_total}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_exe_method</td> <td>{{proposal.proposal_exe_method}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_exe_target</td> <td>{{proposal.proposal_exe_target}}</td> </tr>-->
                                                <!--                        <tr> <td>proposal_wasm_hash</td> <td>{{proposal.proposal_wasm_hash}}</td> </tr>-->
                                                <!--                      </tbody>-->
                                                <!--                    </table>-->
                                                <!--                  </li>-->
                                                <!--                </ul>-->
                                                <!--              </div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- row-->
</template>

<style scoped>
    .text-sm{
        font-size: .9rem;
    }
    ._cani{
        width:23px;
        height:23px;
    }
    .sub-title{
        padding-bottom: 5px;
    }
    .standard_format{
        display: inline;
        padding: 0.2em 0.6em 0.3em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        /*color: #fff;*/
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25em;
    }
    .format_default{
        background-color: #f1f1f1;
    }
    .label-token{
        color:#e4405f;
    }
    .label-nft{
        color: #25d366;
    }
    .quill-div{
        background: #fff;
        height: 150px;
    }
    .ql-container{
        height: 110px !important;
    }
</style>