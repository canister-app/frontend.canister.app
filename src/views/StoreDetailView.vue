<script setup>
    import config from "@/config";
</script>
<script>
    import CanisterManager from "@/services/CanisterManager";
    import EventBus from "../services/EventBus";
    export default {
        data(){
            return{
                imageId: null,
                canisterImage: null
            }
        },
        methods: {
          async getImage(imageId){
              this.canisterImage = await CanisterManager.getCanisterImage(Number(imageId));
              this.canisterImage['imageId'] = Number(imageId);
              console.log('this.imageInfo: ', this.canisterImage);
          },
          showModalDeploy(){
                EventBus.emit('showDeployModal', {status: true, canisterImage: this.canisterImage});
          },
          showModalBuy(){
                EventBus.emit('showCardModal', {status: true, canisterImage: this.canisterImage});
          },
        },
        mounted() {
            this.imageId = this.$route.params.id.match(/^[0-9]+/)[0];
            this.getImage(this.imageId);
            console.log('this.imageId: ', this.imageId)
            console.log(this.$route.params.id.match(/^[0-9]+/));
        }
    }
</script>
<template>
        <div class="container-fluid">

            <div class="nk-content-inner">
                <div class="nk-content-body" v-if="imageId">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between g-3">
                            <div class="nk-block-head-content">
                                <h3 class="nk-block-title page-title"><router-link to="/store">Canister Store</router-link> / <strong class="text-primary small" v-if="canisterImage">{{canisterImage.name}}</strong></h3>
                                <div class="nk-block-des text-soft">
                                    <ul class="list-inline">
                                        <li>Images ID: <span class="text-base">{{imageId}}</span></li>
                                        <li>Last Install: <span class="text-base">15 Jan, 2023 01:02 PM</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="nk-block-head-content">
                                <router-link to="/store" class="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em class="icon ni ni-arrow-left"></em><span>Back</span></router-link>
                                <router-link to="/store" class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em class="icon ni ni-arrow-left"></em></router-link>
                            </div>
                        </div>
                    </div><!-- .nk-block-head -->
                    <div class="nk-block">
                        <div class="card card-bordered">
                            <div class="card-aside-wrap">
                                <div class="card-content">
                                    <ul class="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#"><em class="icon ni ni-template-fill"></em><span>Description</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#"><em class="icon ni ni-repeat"></em><span>Transactions</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#"><em class="icon ni ni-file-text"></em><span>Documents</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#"><em class="icon ni ni-bell"></em><span>Notifications</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#"><em class="icon ni ni-activity"></em><span>Activities</span></a>
                                        </li>
                                        <li class="nav-item nav-item-trigger d-xxl-none">
                                            <a href="#" class="toggle btn btn-icon btn-trigger" data-target="userAside"><em class="icon ni ni-user-list-fill"></em></a>
                                        </li>
                                    </ul><!-- .nav-tabs -->
                                    <div class="card-inner" v-if="canisterImage">
                                        <div class="nk-block">
                                            <div class="nk-block-head">
                                                <h5 class="title">About {{canisterImage.name}}</h5>
                                                <div class="canister-intro" v-html="canisterImage.description"></div>
                                            </div><!-- .nk-block-head -->
                                        </div><!-- .nk-block -->
                                        <div class="nk-divider divider md"></div>
                                        <div class="nk-block">
                                            <div class="nk-block-head nk-block-head-sm nk-block-between">
                                                <h5 class="title">Rating and reviews</h5>
                                                <a href="#" class="link link-sm">+ Add Review</a>
                                            </div><!-- .nk-block-head -->

                                            <div class="card card-bordered">
                                                <div class="card-inner">
                                                    <div class="row">
                                                        <div class="col-lg-4">
                                                            <div class="rating-card text-center mb-1">
                                                                <h6 class="title">Customer Review</h6>
                                                                <div class="rating-wrap bg-light rating-pill my-1">
                                                                    <ul class="rating">
                                                                        <li><em class="icon ni ni-star-fill"></em></li>
                                                                        <li><em class="icon ni ni-star-fill"></em></li>
                                                                        <li><em class="icon ni ni-star-fill"></em></li>
                                                                        <li><em class="icon ni ni-star-half-fill"></em></li>
                                                                        <li><em class="icon ni ni-star"></em></li>
                                                                    </ul>
                                                                    <span class="amount">3.5 out of 5</span>
                                                                </div>
                                                                <span class="sub-text mt-1">40 customers ratings</span>
                                                            </div>
                                                            <div class="gy-3 pt-4">
                                                                <div class="progress-rating">
                                                                    <div class="progress-rating-title">5 star</div>
                                                                    <div class="progress progress-md progress-alt">
                                                                        <div class="progress-bar bg-teal" data-progress="72"></div>
                                                                    </div>
                                                                    <div class="progress-rating-percent">72%</div>
                                                                </div>
                                                                <div class="progress-rating">
                                                                    <div class="progress-rating-title">4 star</div>
                                                                    <div class="progress progress-md progress-alt">
                                                                        <div class="progress-bar bg-success" data-progress="58"></div>
                                                                    </div>
                                                                    <div class="progress-rating-percent">58%</div>
                                                                </div>
                                                                <div class="progress-rating">
                                                                    <div class="progress-rating-title">3 star</div>
                                                                    <div class="progress progress-md progress-alt">
                                                                        <div class="progress-bar bg-info" data-progress="34"></div>
                                                                    </div>
                                                                    <div class="progress-rating-percent">34%</div>
                                                                </div>
                                                                <div class="progress-rating">
                                                                    <div class="progress-rating-title">2 star</div>
                                                                    <div class="progress progress-md progress-alt">
                                                                        <div class="progress-bar bg-warning" data-progress="18"></div>
                                                                    </div>
                                                                    <div class="progress-rating-percent">18%</div>
                                                                </div>
                                                                <div class="progress-rating">
                                                                    <div class="progress-rating-title">1 star</div>
                                                                    <div class="progress progress-md progress-alt">
                                                                        <div class="progress-bar bg-danger" data-progress="55"></div>
                                                                    </div>
                                                                    <div class="progress-rating-percent">55%</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-8">
                                                            <div class="card card-bordered">
                                                                <div class="card-inner">
                                                                    <form action="#" class="mt-2">
                                                                        <div class="form-group">
                                                                            <label class="form-label" for="review">How was your experience?</label>
                                                                            <div class="form-control-wrap">
                                                                                <textarea class="form-control no-resize" id="review"></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                    <h5 class="card-title mt-5">Rating</h5>
                                                                    <div class="rating-card">
                                                                        <div class="d-flex align-center justify-content-between py-1">
                                                                            <span class="text-muted">Productivity</span>
                                                                            <ul class="rating">
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="d-flex align-center justify-content-between py-1">
                                                                            <span class="text-muted">Competitive Position</span>
                                                                            <ul class="rating">
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star"></em></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="d-flex align-center justify-content-between py-1">
                                                                            <span class="text-muted">Brand Value</span>
                                                                            <ul class="rating">
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="d-flex align-center justify-content-between py-1">
                                                                            <span class="text-muted">Environment</span>
                                                                            <ul class="rating">
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star-fill"></em></li>
                                                                                <li><em class="icon ni ni-star"></em></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-footer bg-light border-top d-flex align-center justify-content-end py-3">
                                                                    <a href="#" class="btn btn-primary">Publish Review</a>
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>

                                                </div><!-- .card-inner -->
                                            </div><!-- .card -->
                                           <!-- .card -->


                                        </div><!-- .nk-block -->
                                    </div><!-- .card-inner -->
                                </div><!-- .card-content -->
                                <div class="card-aside card-aside-right user-aside toggle-slide toggle-slide-right toggle-break-xxl" data-content="userAside" data-toggle-screen="xxl" data-toggle-overlay="true" data-toggle-body="true">
                                    <div class="card-inner-group"  v-if="canisterImage">
                                        <div class="card-inner">
                                            <div class="user-card user-card-s2">
                                                <div class="user-avatar lg bg-primary">
                                                    <span>IC</span>
                                                </div>
                                                <div class="user-info">
                                                    <div class="badge bg-outline-light rounded-pill ucap">{{config.CANISTER_IMAGE_CATEGORY[canisterImage.category]}}</div>
                                                    <h5>{{canisterImage.name}}</h5>
                                                    <span class="sub-text">Dfinity Foundation</span>
                                                </div>
                                                <div class="rating-wrap bg-light rating-pill my-1">
                                                    <ul class="rating">
                                                        <li><em class="icon ni ni-star-fill"></em></li>
                                                        <li><em class="icon ni ni-star-fill"></em></li>
                                                        <li><em class="icon ni ni-star-fill"></em></li>
                                                        <li><em class="icon ni ni-star-half-fill"></em></li>
                                                        <li><em class="icon ni ni-star"></em></li>
                                                    </ul>
                                                    <span class="amount">3.5 out of 5</span>
                                                </div>
                                                <div class="card-inner card-inner-sm">
                                                    <button v-if="canisterImage.price>0" class="btn btn-danger" @click="showModalBuy"><em class="icon ni ni-cart"></em>&nbsp; Buy for {{canisterImage.price}} ICP</button>
                                                    <button v-else class="btn btn-primary" @click="showModalDeploy"><em class="icon ni ni-plus"></em> Deploy</button>
                                                </div>

                                            </div>
                                        </div><!-- .card-inner -->
                                        <div class="card-inner card-inner-sm">
                                            <ul class="btn-toolbar justify-center gx-1">
                                                <li><a :href="canisterImage.repo" class="btn btn-trigger btn-icon" target="_blank" title="Github Repo"><em class="icon ni ni-github-circle"></em></a></li>
                                                <li v-for="link in canisterImage.community"><a :href="link" target="_blank" class="btn btn-trigger btn-icon"><em class="icon ni ni-globe"></em></a></li>
                                                <li><a href="#" class="btn btn-trigger btn-icon"><em class="icon ni ni-bookmark"></em></a></li>
<!--                                                <li><a href="#" class="btn btn-trigger btn-icon text-danger"><em class="icon ni ni-na"></em></a></li>-->
                                            </ul>
                                        </div><!-- .card-inner -->
                                        <div class="card-inner">
                                            <div class="row text-center">
                                                <div class="col-4">
                                                    <div class="profile-stats">
                                                        <span class="amount">223</span>
                                                        <span class="sub-text">Total Install</span>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="profile-stats">
                                                        <span class="amount">20</span>
                                                        <span class="sub-text">Complete</span>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="profile-stats">
                                                        <span class="amount">3</span>
                                                        <span class="sub-text">Progress</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><!-- .card-inner -->
                                        <div class="card-inner">
                                            <h6 class="overline-title-alt mb-2">Additional</h6>
                                            <div class="row g-3">
                                                <div class="col-6">
                                                    <span class="sub-text">Publisher:</span>
                                                    <span>UD003054</span>
                                                </div>
                                                <div class="col-6">
                                                    <span class="sub-text">Last Login:</span>
                                                    <span>15 Jan, 2023 01:02 PM</span>
                                                </div>
                                                <div class="col-6">
                                                    <span class="sub-text">Template Status:</span>
                                                    <span class="lead-text text-success">Approved</span>
                                                </div>
                                                <div class="col-6">
                                                    <span class="sub-text">Last Install:</span>
                                                    <span>Jan 24, 2023</span>
                                                </div>
                                            </div>
                                        </div><!-- .card-inner -->
                                        <div class="card-inner">
                                            <h6 class="overline-title-alt mb-3">Tags</h6>
                                            <ul class="g-1">
                                                <li class="btn-group">
                                                    <a class="btn btn-xs btn-light btn-dim" href="#">canister</a>
                                                    <a class="btn btn-xs btn-icon btn-light btn-dim" href="#"><em class="icon ni ni-cross"></em></a>
                                                </li>
                                                <li class="btn-group">
                                                    <a class="btn btn-xs btn-light btn-dim" href="#">token</a>
                                                    <a class="btn btn-xs btn-icon btn-light btn-dim" href="#"><em class="icon ni ni-cross"></em></a>
                                                </li>
                                                <li class="btn-group">
                                                    <a class="btn btn-xs btn-light btn-dim" href="#">deploy</a>
                                                    <a class="btn btn-xs btn-icon btn-light btn-dim" href="#"><em class="icon ni ni-cross"></em></a>
                                                </li>
                                            </ul>
                                        </div><!-- .card-inner -->
                                    </div><!-- .card-inner -->
                                </div><!-- .card-aside -->
                            </div><!-- .card-aside-wrap -->
                        </div><!-- .card -->
                    </div><!-- .nk-block -->
                </div>
            </div>
        </div>
    <!-- content @e -->
</template>
<style>
    .canister-intro * {
        resize: none;
        word-wrap:break-word;
    }
    .canister-intro code{
        display: inline-block;
        white-space: normal;
        max-width:100%;
        word-break:break-all;
        word-wrap:break-word;
    }
    .canister-intro h2{
        font-size: 1.4rem;
    }
    .canister-intro h2{
        font-size: 1.2rem;
    }
    .canister-intro h3{
        font-size: 1.1rem;
    }
</style>