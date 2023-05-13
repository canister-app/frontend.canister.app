<script>
    import CanisterManager from "@/services/CanisterManager";
    import { formatDate, unit8ArrToString, canisterStatus as statusLabel, showLoading} from "../IC/utils";
    import IconCopy from "@/components/icons/IconCopy.vue";
    import Loading from "@/components/Loading.vue";
    import config from "../config";
    export default {
        components: {IconCopy, Loading},
        data(){
            return{
                formatDate,
                unit8ArrToString,
                statusLabel,
                config,
                canisterInfo: null,
                canisterStatus: null,//IC Status
                canisterId: null,
                canisterHistory: null,
                badges: {
                    "start": "success",
                    "reinstall": "danger",
                    "install": "primary",
                    "create": "info",
                    "stop": "warning",
                    "delete": "danger"
                },
                checkStatus: null
            }
        },
        methods: {
            async getCanister(canister_id){
                this.canisterInfo = null;
                this.canisterInfo = await CanisterManager.getCanister(canister_id);
                this.checkStatus = statusLabel(this.canisterInfo.status)
            },
            async getCanisterStatus(canister_id){
                this.canisterStatus = null;
                this.canisterStatus = await CanisterManager.getCanisterStatus(canister_id);
            },
            async getCanisterHistory(){
                this.canisterHistory = null;
                let _myCanister = await CanisterManager.getCanisterHistory(this.canisterId);
                _myCanister.sort( function ( a, b ) { return Number(b[1].time) - Number(a[1].time); } );
                this.canisterHistory = _myCanister.map( canister => {
                    return {
                        canister_id: canister[1].canisterId,
                        action: canister[1].action,
                        maker: canister[1].maker,
                        time: formatDate(canister[1].time),
                    };
                });
            },
            async canisterAction(method){
                window.Swal.fire({
                    icon: 'question',
                    title: 'Confirmation',
                    html: 'Are you sure you want to '+method+' your canister?',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: '#bbbbbb'
                }).then(async (result) => {
                        if (result.isConfirmed) {
                            showLoading('Requesting to '+method+' your canister, please wait...');
                            let result = await CanisterManager.handleAction(this.canisterId, method);
                            if("ok" in result){
                                this.init(this.canisterId);//Reload
                                window.Swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    html: '<p>Action <strong>'+method+'</strong> completed successfully</p>',
                                })
                            }else{
                                window.Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: result.err,
                                })
                            }
                        }
                })
            },
            async canisterControl(method){
                let _result = await CanisterManager.handleAction(this.canisterId, method);
                this.init(this.canisterId);//Reload
                console.log('_result: ', _result);
            },
            init(canisterId){
                this.getCanister(canisterId);
                this.getCanisterStatus(canisterId);
                this.getCanisterHistory(canisterId);
            }
        },
        mounted() {
           this.canisterId = this.$route.params.canister_id;
           this.init(this.canisterId);
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
                            <h3 class="nk-block-title page-title"><router-link to="/my-canister">My Canisters</router-link> / <strong class="text-primary small" v-if="canisterInfo">{{canisterInfo.canisterName}}</strong></h3>
                            <div class="nk-block-des text-soft">
                                <ul class="list-inline">
                                    <li>Canister ID: <span class="text-base">{{canisterId}}</span></li>
                                    <li v-if="canisterInfo">Created At: <span class="text-base">{{formatDate(canisterInfo.created)}}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="nk-block-head-content">
                            <router-link to="/my-canister" class="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em class="icon ni ni-arrow-left"></em><span>Back</span></router-link>
                            <router-link to="/my-canister" class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em class="icon ni ni-arrow-left"></em></router-link>
                        </div>
                    </div>
                </div><!-- .nk-block-head -->
                <div class="nk-block">
                    <div class="row gy-7">
                        <div class="col-lg-7">
                            <div class="nk-block-head">
                                <div class="nk-block-head-content">
                                    <h5 class="nk-block-title title">Canister Info</h5>
                                </div>
                            </div><!-- .nk-block-head -->
                            <div class="card card-bordered">
                                <ul class="data-list is-compact" v-if="canisterInfo">
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Canister Name</div>
                                            <div class="data-value">{{canisterInfo.canisterName}} <IconCopy :text="canisterInfo.canisterName" item="Canister Name"/></div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Canister ID</div>
                                            <div class="data-value">{{canisterInfo.canisterId}} <IconCopy :text="canisterInfo.canisterId" item="Canister ID" /></div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Created At</div>
                                            <div class="data-value">{{formatDate(canisterInfo.created)}}</div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Updated At</div>
                                            <div class="data-value">{{formatDate(canisterInfo.updated)}}</div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Installed Image</div>
                                            <div class="data-value">
                                                {{canisterInfo.imageId}}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Status</div>
                                            <div class="data-value"><span :class="`badge badge-dim badge-sm bg-outline-${checkStatus.style}`">{{checkStatus.label}}</span></div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Manage</div>
                                            <div class="data-value">
                                                <div class="btn-group btn-group-sm" aria-label="Canister Manage">
                                                    <button @click="canisterAction('start')" type="button" class="btn btn-sm btn-outline-light" v-if="canisterInfo.status == 2"><em class="icon ni ni-play"></em><span>Start</span></button>
                                                    <button @click="canisterAction('stop')" type="button" class="btn btn-sm btn-outline-light" v-if="canisterInfo.status == 1"><em class="icon ni ni-stop-circle"></em><span>Stop</span></button>
                                                    <button @click="canisterControl('reinstall')" type="button" class="btn btn-sm btn-outline-light" v-if="canisterInfo.status != 3"><em class="icon ni ni-reload"></em><span>Reinstall</span></button>
                                                    <button @click="canisterAction('delete')" type="button" class="btn btn-sm btn-outline-light text-danger" v-if="canisterInfo.status != 3"><em class="icon ni ni-trash text-danger"></em><span>Delete</span></button>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div><!-- .card -->

                        </div><!-- .col -->
                        <div class="col-lg-5">
                            <div class="nk-block-head">
                                <div class="nk-block-head-content">
                                    <h5 class="nk-block-title title">Canister Status</h5>
                                </div>
                            </div><!-- .nk-block-head -->
                            <div class="card card-bordered">
                                <Loading message="Loading canister status" v-if="!canisterStatus"></Loading>
                                <ul class="data-list is-compact" v-if="canisterStatus">
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Cycles</div>
                                            <div class="data-value">{{Number(canisterStatus.cycles)/1_000_000_000_000}}T <IconCopy /></div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Freezing Threshold</div>
                                            <div class="data-value">{{canisterStatus.freezing_threshold}} <IconCopy /></div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Memory Size</div>
                                            <div class="data-value">{{canisterStatus.memory_size}}</div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">Module Hash</div>
                                            <div class="data-value"></div>
                                        </div>
                                    </li>
                                    <li class="data-item">
                                        <div class="data-col">
                                            <div class="data-label w-30">IC Status</div>
                                            <div class="data-value">{{canisterStatus.status}}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div><!-- .card -->

                        </div><!-- .col -->
                    </div><!-- .row -->
                    <div class="row gy-7 pt-5">
                        <div class="col-lg-7">
                        <div class="nk-block-head">
                            <div class="nk-block-head-content">
                                <h5 class="nk-block-title title">Canister History</h5>
                            </div>
                        </div>
                        <div class="card card-bordered">
                            <table class="table table-tranx is-compact">
                                <thead>
                                <tr class="tb-tnx-head">
                                    <th>Action</th>
                                    <th>By</th>
                                    <th>Time</th>
                                </tr></thead>
                                <tbody>
                                <tr class="tb-tnx-item" v-for="(history, idx) in canisterHistory">
                                    <td class="tb-tnx-id">
                                        <span :class="`badge bg-outline-${badges[history.action]}`">{{history.action}}</span>
                                    </td>
                                    <td class="tb-tnx-info">
                                        <span class="title">{{history.maker}}</span>
                                    </td>
                                    <td class="">
                                        <span class="date">{{history.time}}</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div><!-- .nk-block -->
            </div>
        </div>
    </div>
    <!-- content @e -->
</template>
<style>
    .date{
        color: #8094ae
    }
</style>