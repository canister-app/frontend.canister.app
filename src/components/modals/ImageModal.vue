<script>
    import { VueFinalModal } from 'vue-final-modal'
    import EventBus from "../../services/EventBus"
    import ImageManager from "../../services/ImageManager";
    import config from "@/config"
    import { showLoading, showError, closeSwal } from "@/IC/utils.js";
    import IconRequired from "../icons/IconRequired.vue";
    import {walletData} from "../../services/store";
    import { QuillEditor } from '@vueup/vue-quill'

    export default {
        components: { VueFinalModal, QuillEditor, IconRequired },
        data() {
            return {
                config,
                imageModal: false,
                imageId: null,
                categories: [],
                template_name: "",
                template_thumbnail: "",
                template_code: "",
                template_price: "",
                template_repo: "",
                template_category: "",
                template_brief: "",
                template_description: "",
            }
        },
        methods: {
            async updateCanisterImage(){
                let _imageObj = {
                    name: this.template_name,
                    thumbnail: [this.template_thumbnail],
                    code: this.template_code,
                    repo: this.template_repo,
                    category: this.template_category,
                    description: this.$refs.myEditor.getHTML(),
                    brief: this.template_brief,
                    price: this.template_price,
                    metadata: []
                }
                console.log('_imageObj: ', _imageObj);
                showLoading("Updating canister image...");
                let _result = await ImageManager.editImage(this.imageId, _imageObj);
                console.log('_result: ', _result)
                if("ok" in _result){
                    closeSwal();
                    this.imageModal = false;//Close the modal after
                }else{
                    showError("Can not update: "+_result.err)
                }
            },
            async getCategory(){
                this.categories = await ImageManager.getCategory();
            },
        },
        mounted() {
            EventBus.on("showImageModal", obj => {
                console.log('obj: ', obj)
                if(obj){
                    this.imageId = obj.template_id;
                    this.imageModal = obj.status;
                    this.template_name = obj.template.name;
                    this.template_thumbnail = obj.template.thumbnail[0];
                    this.template_code = obj.template.code;
                    this.template_repo = obj.template.repo;
                    this.template_category = obj.template.category;
                    this.template_brief = obj.template.brief;
                    this.template_price = Number(obj.template.price);
                    this.template_description = this.$refs.myEditor.setHTML(obj.template.description);
                }
                this.getCategory();
            });
        }
    }
</script>

<template>
    <VueFinalModal v-model="imageModal" :z-index-base="2000" classes="modal fade show" content-class="modal-dialog modal-lg">
            <div class="modal-content">
                <a href="#" @click.stop="imageModal=false" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <em class="icon ni ni-cross"></em>
                </a>
                <div class="modal-header">
                    <h5 class="modal-title">Edit canister image </h5>
                </div>
                <div class="modal-body pt-3 pb-0">
                    <div class="row gy-4 align-center  pb-2">
                        <div class="form-item mb-4">
                            <div class="mb-3">
                                <label class="mb-2 form-label">Image Name:</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Template name..." v-model="template_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="mb-2 form-label">Image Code:</label>
                                <input type="text" class="form-control form-control-s1" placeholder="ICRC1" v-model="template_code" required>
                            </div>
                            <div class="mb-3">
                                <label class="mb-2 form-label">Price:</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Set 0 for free" v-model="template_price" required>
                            </div>
                            <div class="mb-3">
                                <label class="mb-2 form-label">Thumbnails:</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Link to thumbnail" v-model="template_thumbnail" required>
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
                                <label class="mb-2 form-label">Brief:</label>
                                <textarea name="brief" rows="1" class="form-control" placeholder="Short intro..." v-model="template_brief" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="mb-2 form-label">Description:</label>
                                <div class="card">
                                    <QuillEditor ref="myEditor" theme="snow" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-danger btn-block" @click="updateCanisterImage">
                                    <em class="icon ni ni-update"></em> Update
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="imageModal=false" class="link link-primary">Close</a></li>
                    </ul>
                </div>
        </div>
    </VueFinalModal>

</template>
<style>

</style>