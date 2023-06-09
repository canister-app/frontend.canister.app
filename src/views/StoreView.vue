<script>
    import CanisterManager from "@/services/CanisterManager";
    import CanisterImage from "../components/store/CanisterImage.vue";
    import StoreHeader from "../components/store/StoreHeader.vue";
    import Loading from "@/components/Loading.vue";

    export default {
        components: {Loading, StoreHeader, CanisterImage},
        data(){
            return{
                canisterImages: null
            }
        },
        methods: {
            async getCanisterImages(){
                this.canisterImages = null;
                this.canisterImages = await CanisterManager.getCanisterImages();
                console.log('this.canisterImages: ', this.canisterImages);
            }
        },
        mounted() {
           this.getCanisterImages();
        }
    }
</script>

<template>
        <div class="container-fluid">
            <div class="nk-content-inner">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between">
                            <div class="nk-block-head-content">
                                <h3 class="nk-block-title page-title">Canister Store</h3>
                                <div class="nk-block-des text-soft">
                                    <p>Empowering users, powering the future.</p>
                                </div>
                            </div><!-- .nk-block-head-content -->
                            <div class="nk-block-head-content">
                                <div class="toggle-wrap nk-block-tools-toggle">
                                    <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em class="icon ni ni-more-v"></em></a>
                                    <div class="toggle-expand-content" data-content="pageMenu">
                                        <ul class="nk-block-tools g-3">
                                            <li><a href="javascript:void(0)" @click="getCanisterImages" class="btn btn-white btn-dim btn-outline-primary"><em class="icon ni ni-reload"></em><span>Refresh</span></a></li>
                                            <li><a href="javascript:void(0)" class="btn btn-white btn-dim btn-outline-primary"><em class="icon ni ni-reports"></em><span>Reports</span></a></li>
                                            <li class="nk-block-tools-opt">
                                                <div class="drodown">
                                                    <a href="#" class="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="dropdown"><em class="icon ni ni-plus"></em></a>
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <ul class="link-list-opt no-bdr">
                                                            <li><a href="#"><em class="icon ni ni-user-add-fill"></em><span>Add User</span></a></li>
                                                            <li><a href="#"><em class="icon ni ni-coin-alt-fill"></em><span>Add Order</span></a></li>
                                                            <li><a href="#"><em class="icon ni ni-note-add-fill-c"></em><span>Add Page</span></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div><!-- .nk-block-head-content -->
                        </div><!-- .nk-block-between -->
                    </div><!-- .nk-block-head -->
<!--                    <StoreHeader />-->
                    <div class="nk-block">
<!--                        <div class="nk-block-head">-->
<!--                            <div class="nk-block-between g-3">-->
<!--                                <div class="nk-block-head-content">-->
<!--                                    <h3 class="nk-block-title page-title">Top canisters</h3>-->
<!--                                    <div class="nk-block-des text-soft"><p>Choose your canister image and start deploying.</p></div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->

                        <div class="row g-gs">
                                <div class="col-xl-6 col-xxl-3" v-if="!canisterImages">
                                    <Loading  message="Loading canister images" />
                                </div>
                            <div class="col-xl-6 col-xxl-3" v-for="image in canisterImages">
                                    <CanisterImage :image="image" />
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- content @e -->
</template>
