<script>
    import CanisterManager from "@/services/CanisterManager";
    import { formatDate, timeAgo, canisterStatus } from "../IC/utils";
    import IconCopy from "@/components/icons/IconCopy.vue";
    import Loading from "@/components/Loading.vue";
    import config from "../config";
    export default {
        components: {IconCopy, Loading},
        data(){
            return{
                formatDate,
                canisterStatus,
                timeAgo,
                config,
                myCanisters: null,
                imageList: null
            }
        },
        methods: {
            async getMyCanister(){
                this.myCanisters = null;
                this.myCanisters = await CanisterManager.getMyCanister();
            },
            async getImageList(){
                this.imageList = await CanisterManager.getImageList();
            }
        },
        mounted() {
           this.getMyCanister();
           this.getImageList();
        }
    }
</script>

<template>
    <div class="container-fluid">
        <div class="nk-content-inner">
            <div class="nk-content-body">
                <div class="nk-block-head nk-block-head-sm">
                    <div class="nk-block-between g-3">
                        <div class="nk-block-head-content">
                            <h3 class="nk-block-title page-title">My Canisters</h3>
                            <div class="nk-block-des text-soft">
                                <p>You have total <span v-if="myCanisters">{{myCanisters.length}}</span>  canisters.</p>
                            </div>
                        </div><!-- .nk-block-head-content -->
                        <div class="nk-block-head-content">
                            <div class="toggle-wrap nk-block-tools-toggle">
                                <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a>
                                <div class="toggle-expand-content" data-content="pageMenu">
                                    <ul class="nk-block-tools g-3">
                                        <li><a href="javascript:void(0)" @click="getMyCanister" class="btn btn-white btn-dim btn-outline-light"><em class="icon ni ni-reload"></em></a></li>
                                        <li><a href="javascript:void(0)" @click="getMyCanister" class="btn btn-white btn-dim btn-outline-primary"><em class="icon ni ni-link"></em><span>Link canister</span></a></li>
                                        <li><router-link to="/store" class="btn btn-primary"><em class="icon ni ni-bag"></em><span>Store</span></router-link></li>
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
                                <div class="card-title-group">
                                    <div class="card-title">
                                        <h5 class="title">All Canisters</h5>
                                    </div>
                                    <div class="card-tools me-n1">
                                        <ul class="btn-toolbar gx-1">
                                            <li>
                                                <a href="#" class="search-toggle toggle-search btn btn-icon" data-target="search"><em class="icon ni ni-search"></em></a>
                                            </li><!-- li -->
                                            <li class="btn-toolbar-sep"></li><!-- li -->
                                            <li>
                                                <div class="dropdown">
                                                    <a href="#" class="btn btn-trigger btn-icon dropdown-toggle" data-bs-toggle="dropdown">
                                                        <div class="badge badge-circle bg-primary">4</div>
                                                        <em class="icon ni ni-filter-alt"></em>
                                                    </a>
                                                    <div class="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-end">
                                                        <div class="dropdown-head">
                                                            <span class="sub-title dropdown-title">Advance Filter</span>
                                                            <div class="dropdown">
                                                                <a href="#" class="link link-light">
                                                                    <em class="icon ni ni-more-h"></em>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-body dropdown-body-rg">
                                                            <div class="row gx-6 gy-4">
                                                                <div class="col-6">
                                                                    <div class="form-group">
                                                                        <label class="overline-title overline-title-alt">Type</label>
                                                                        <select class="form-select js-select2">
                                                                            <option value="any">Any Type</option>
                                                                            <option value="deposit">Deposit</option>
                                                                            <option value="buy">Buy Coin</option>
                                                                            <option value="sell">Sell Coin</option>
                                                                            <option value="transfer">Transfer</option>
                                                                            <option value="withdraw">Withdraw</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-group">
                                                                        <label class="overline-title overline-title-alt">Status</label>
                                                                        <select class="form-select js-select2">
                                                                            <option value="any">Any Status</option>
                                                                            <option value="pending">Pending</option>
                                                                            <option value="cancel">Cancel</option>
                                                                            <option value="process">Process</option>
                                                                            <option value="completed">Completed</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-group">
                                                                        <label class="overline-title overline-title-alt">Pay Currency</label>
                                                                        <select class="form-select js-select2">
                                                                            <option value="any">Any Coin</option>
                                                                            <option value="bitcoin">Bitcoin</option>
                                                                            <option value="ethereum">Ethereum</option>
                                                                            <option value="litecoin">Litecoin</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-group">
                                                                        <label class="overline-title overline-title-alt">Method</label>
                                                                        <select class="form-select js-select2">
                                                                            <option value="any">Any Method</option>
                                                                            <option value="paypal">PayPal</option>
                                                                            <option value="bank">Bank</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-group">
                                                                        <div class="custom-control custom-control-sm custom-checkbox">
                                                                            <input type="checkbox" class="custom-control-input" id="includeDel">
                                                                            <label class="custom-control-label" for="includeDel"> Including Deleted</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <div class="form-group">
                                                                        <button type="button" class="btn btn-secondary">Filter</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-foot between">
                                                            <a class="clickable" href="#">Reset Filter</a>
                                                            <a href="#savedFilter" data-bs-toggle="modal">Save Filter</a>
                                                        </div>
                                                    </div><!-- .filter-wg -->
                                                </div><!-- .dropdown -->
                                            </li><!-- li -->
                                            <li>
                                                <div class="dropdown">
                                                    <a href="#" class="btn btn-trigger btn-icon dropdown-toggle" data-bs-toggle="dropdown">
                                                        <em class="icon ni ni-setting"></em>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-xs dropdown-menu-end">
                                                        <ul class="link-check">
                                                            <li><span>Show</span></li>
                                                            <li class="active"><a href="#">10</a></li>
                                                            <li><a href="#">20</a></li>
                                                            <li><a href="#">50</a></li>
                                                        </ul>
                                                        <ul class="link-check">
                                                            <li><span>Order</span></li>
                                                            <li class="active"><a href="#">DESC</a></li>
                                                            <li><a href="#">ASC</a></li>
                                                        </ul>
                                                    </div>
                                                </div><!-- .dropdown -->
                                            </li><!-- li -->
                                        </ul><!-- .btn-toolbar -->
                                    </div><!-- .card-tools -->
                                    <div class="card-search search-wrap" data-search="search">
                                        <div class="search-content">
                                            <a href="#" class="search-back btn btn-icon toggle-search" data-target="search"><em class="icon ni ni-arrow-left"></em></a>
                                            <input type="text" class="form-control border-transparent form-focus-none" placeholder="Quick search by transaction">
                                            <button class="search-submit btn btn-icon"><em class="icon ni ni-search"></em></button>
                                        </div>
                                    </div><!-- .card-search -->
                                </div><!-- .card-title-group -->
                            </div><!-- .card-inner -->
                            <div class="card-inner p-0">
                                <div class="nk-tb-list nk-tb-tnx">
                                    <div class="nk-tb-item nk-tb-head">
                                        <div class="nk-tb-col"><span>Canister Name</span></div>
                                        <div class="nk-tb-col tb-col-xxl"><span>Canister ID</span></div>
                                        <div class="nk-tb-col tb-col-lg"><span>Installed image</span></div>
                                        <div class="nk-tb-col tb-col-lg"><span>Last updated</span></div>
                                        <div class="nk-tb-col text-end tb-col-sm"><span>Cycles</span></div>
                                        <div class="nk-tb-col nk-tb-col-status"><span class="sub-text d-none d-md-block">Status</span></div>
                                        <div class="nk-tb-col nk-tb-col-tools"></div>
                                    </div><!-- .nk-tb-item -->
                                    <Loading message="Loading your canister list..." v-if="!myCanisters"></Loading>

                                    <div class="nk-tb-item" v-for="canister in myCanisters">
                                        <div class="nk-tb-col">
                                            <div class="nk-tnx-type">
                                                <div class="nk-tnx-type-icon bg-primary-dim text-primary">
                                                    <em class="icon ni ni-box"></em>
                                                </div>
                                                <div class="nk-tnx-type-text">
                                                    <div class="tb-lead">
                                                        <router-link :to="`/my-canister/${canister.canisterId}`">
                                                            {{canister.canisterName}}
                                                        </router-link>
                                                        &nbsp;<span class="badge bg-light">{{config.STANDARD(canister.imageId)}}</span>
                                                    </div>
                                                    <span class="tb-date">{{formatDate(canister.created)}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nk-tb-col tb-col-xxl">
                                            <span v-if="canister.statusCode == 3" :class="`tb-lead-sub ${canister.statusCode == 3?'text-muted':''}`"><del>{{canister.canisterId}}</del></span>
                                            <span class="tb-lead-sub" v-else><a :href="`${config.IC_SCAN+canister.canisterId}`" target="_blank">{{canister.canisterId}} <em class="icon ni ni-external"></em></a> <IconCopy :text="canister.canisterId" item="Canister ID"  v-if="canister.statusCode != 3"/></span>
                                        </div>
                                        <div class="nk-tb-col tb-col-lg">
                                            <span class="tb-lead-sub" v-if="imageList"><router-link :to="`/store/${canister.imageId+'-'+imageList[canister.imageId]?.code}`">{{imageList[canister.imageId]?.name}}</router-link></span>
                                        </div>
                                        <div class="nk-tb-col tb-col-lg">
                                            <span class="tb-date">{{formatDate(canister.updated)}}</span>
                                        </div>
                                        <div class="nk-tb-col text-end tb-col-sm">
                                            <span class="tb-amount">{{(Number(canister.cycles)/config.CYCLES).toFixed(3)}} <span>T</span></span>
                                            <span class="tb-amount-sm">{{timeAgo(canister.cycles_updated)}} <i class="ni ni-history"></i> </span>
                                        </div>
                                        <div class="nk-tb-col nk-tb-col-status">
                                            <div class="dot dot-success d-md-none"></div>
                                            <span :class="`badge badge-sm badge-dim bg-outline-${canister.status.style} d-none d-md-inline-flex`">{{canister.status.label}}</span>
                                        </div>
                                        <div class="nk-tb-col nk-tb-col-tools">
                                            <ul class="nk-tb-actions gx-2">
                                                <li class="nk-tb-action-hidden">
                                                    <a href="#" class="bg-white btn btn-sm btn-outline-light btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Topup Cycles">
                                                        <em class="icon ni ni-gift"></em>
                                                    </a>
                                                </li>
                                                <li class="nk-tb-action-hidden">
                                                    <a href="#tranxDetails" data-bs-toggle="modal" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="Details"><em class="icon ni ni-eye"></em></a>
                                                </li>
                                                <li>
                                                    <div class="dropdown">
                                                        <a href="#" class="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <ul class="link-list-opt">
                                                                <li><a href="#"><em class="icon ni ni-reload"></em><span>Reinstall</span></a></li>
                                                                <li><a href="#"><em class="icon ni ni-cross-round text-danger"></em><span>Stop</span></a></li>
                                                                <li><a href="#"><em class="icon ni ni-trash text-danger"></em><span>Delete</span></a></li>
                                                                <li><a href="#tranxDetails" data-bs-toggle="modal"><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div><!-- .nk-tb-item -->
                                </div><!-- .nk-tb-list -->
                            </div><!-- .card-inner -->
                            <div class="card-inner">
                                <ul class="pagination justify-content-center justify-content-md-start">
                                    <li class="page-item"><a class="page-link disabled" href="#">Prev</a></li>
<!--                                    <li class="page-item"><a class="page-link" href="#">1</a></li>-->
<!--                                    <li class="page-item"><a class="page-link" href="#">2</a></li>-->
<!--                                    <li class="page-item"><span class="page-link"><em class="icon ni ni-more-h"></em></span></li>-->
<!--                                    <li class="page-item"><a class="page-link" href="#">6</a></li>-->
<!--                                    <li class="page-item"><a class="page-link" href="#">7</a></li>-->
                                    <li class="page-item"><a class="page-link disabled" href="#">Next</a></li>
                                </ul>
                            </div><!-- .card-inner -->
                        </div><!-- .card-inner-group -->
                    </div><!-- .card -->
                </div><!-- .nk-block -->
            </div>
        </div>
    </div>
    <!-- content @e -->
</template>
