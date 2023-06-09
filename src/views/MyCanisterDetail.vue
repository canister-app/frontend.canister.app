<script>
    import CanisterManager from "@/services/CanisterManager.js";
    import TokenManager from "@/services/TokenManager.js";
    import { toHexString, formatDate, principalToText, formatter, ICStatus, unit8ArrToString, canisterStatus as statusLabel, showLoading} from "../IC/utils";
    import IconCopy from "@/components/icons/IconCopy.vue";
    import IconPlug from "@/components/icons/IconPlug.vue";
    import Loading from "@/components/Loading.vue";
    import config from "../config";
    import EventBus from "../services/EventBus"

    export default {
        components: {IconCopy, IconPlug, Loading},
        data(){
            return{
                formatDate,
                unit8ArrToString,
                statusLabel,
                ICStatus,
                formatter,
                principalToText,
                config,
                canisterData: null,//Data for Token, NFT...etc
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
                checkStatus: null,
                checkIDStatus: null,
                imageList: null,
                standard: "",
                moduleHash: ""
            }
        },
        methods: {
            async getCanister(canister_id){
                this.canisterInfo = null;
                this.canisterInfo = await CanisterManager.getCanister(canister_id);
                this.standard = config.STANDARD(Number(this.canisterInfo.imageId));
                this.checkStatus = statusLabel(this.canisterInfo.status)
                await this.getTokenInfo(this.standard);
            },
            async getCanisterStatus(canister_id){
                this.canisterStatus = null;
                this.canisterStatus = await CanisterManager.getCanisterStatus(canister_id);
                if(this.canisterStatus){
                    console.log('this.canisterStatus: ', this.canisterStatus);
                    this.moduleHash = this.canisterStatus.module_hash.length > -1?toHexString(this.canisterStatus.module_hash[0]):"";
                    this.checkICStatus = ICStatus(this.canisterStatus.status)
                }
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
                        canisterName: canister[1].canisterName,
                        imageName: canister[1].imageName,
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
            },
            async getImageList(){
                this.imageList = await CanisterManager.getImageList();
            },
            async getTokenInfo(standard){
                try{
                    this.canisterData = await TokenManager.getMetaData(this.canisterId, standard);
                }catch (e) {
                    this.canisterData = null;
                }
            },
            addToPlug(){
              alert("Soon!")
            },
            tokenAction(action){
              EventBus.emit('showTokenModal', {
                  status: true,
                  canisterData: this.canisterData,
                  standard: this.standard,
                  canisterId: this.canisterInfo.canisterId,
                  action
              })
            },
            init(canisterId){
                this.getCanister(canisterId);
                this.getCanisterStatus(canisterId);
                this.getCanisterHistory(canisterId);
                this.getImageList();
            }
        },
        mounted() {
            EventBus.on('canisterData', obj =>{
                this.getCanister(this.canisterId);
            })
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
                                    <li>Canister ID:
                                        <a v-if="canisterInfo" :href="`${config.IC_SCAN+canisterInfo.canisterId}`" target="_blank">{{canisterInfo.canisterId}}</a> <em class="icon ni ni-external"></em>
                                    </li>
                                    <li v-if="canisterInfo && imageList">Installed Image: <router-link :to="`/store/${canisterInfo.imageId+'-'+imageList[canisterInfo.imageId]?.code}`">{{imageList[canisterInfo.imageId]?.name}}</router-link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="nk-block-head-content">
                            <router-link to="/my-canister" class="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em class="icon ni ni-arrow-left"></em><span>Back</span></router-link>
                            &nbsp;<a href="javascript:void(0)" @click="init(canisterId)" class="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em class="icon ni ni-update"></em><span>Refresh</span></a>
                            <router-link to="/my-canister" class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em class="icon ni ni-arrow-left"></em></router-link>
                        </div>
                    </div>
                </div><!-- .nk-block-head -->
                <div class="nk-block">
                    <div class="card card-bordered">
                        <div class="card-aside-wrap">
                            <div class="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-toggle-body="true" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                <div class="card-inner-group" data-simplebar>
                                    <div class="card-inner">
                                        <div class="user-card">
                                            <div class="user-avatar bg-primary">
                                                <span>IC</span>
                                            </div>
                                            <div class="user-info">
                                                <span class="lead-text" v-if="canisterInfo">{{canisterInfo.canisterName}}&nbsp;<IconCopy :text="canisterInfo.canisterName" item="Canister Name"/></span>
                                                <span class="sub-text" v-if="canisterInfo">{{canisterInfo.canisterId}}&nbsp;<IconCopy :text="canisterInfo.canisterId" item="Canister ID"/></span>
                                            </div>

                                        </div><!-- .user-card -->
                                        <div class="data-col pt-3">
                                            <div class="btn-group btn-group-sm mg-auto" aria-label="Canister Manage" v-if="canisterInfo">
                                                <button @click="canisterAction('start')" type="button" class="btn btn-sm btn-outline-light" v-if="canisterInfo.status == 2"><em class="icon ni ni-play"></em><span>Start</span></button>
                                                <button @click="canisterAction('stop')" type="button" class="btn btn-sm btn-outline-light" v-if="canisterInfo.status == 1"><em class="icon ni ni-stop-circle"></em><span>Stop</span></button>
                                                <button @click="canisterControl('reinstall')" type="button" class="btn btn-sm btn-outline-light" v-if="canisterInfo.status != 3"><em class="icon ni ni-reload"></em><span>Reinstall</span></button>
                                                <button @click="canisterAction('delete')" type="button" class="btn btn-sm btn-outline-light text-danger" v-if="canisterInfo.status != 3"><em class="icon ni ni-trash text-danger"></em><span>Delete</span></button>
                                            </div>
                                        </div>
                                    </div><!-- .card-inner -->
                                    <div class="card-inner">
                                        <div class="user-account-info py-0">
                                            <h6 class="overline-title-alt">Canister Cycles</h6>
                                            <div class="user-balance" v-if="!canisterStatus">--- <small class="currency currency-btc">T</small></div>
                                            <div class="user-balance" v-if="canisterStatus">{{Number(canisterStatus.cycles)/config.CYCLES}} <small class="currency currency-btc">T</small> <button class="btn btn-sm btn-outline-light"><i class="ni ni-gift"></i> Topup</button></div>
<!--                                            <div class="user-balance-sub">Locked <span>0.344939 <span class="currency currency-btc">BTC</span></span></div>-->
                                        </div>

                                    </div><!-- .card-inner -->
                                    <div class="card-inner p-0">
                                        <Loading message="Loading canister status" v-if="!canisterStatus && canisterInfo && canisterInfo.status != 3"></Loading>
                                        <ul class="data-list is-compact" v-if="!canisterStatus && canisterInfo && canisterInfo.status==3">
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Status</div>
                                                    <div class="data-value"><span :class="`badge badge-dim badge-sm bg-outline-danger`">Deleted</span></div>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul class="data-list is-compact" v-if="canisterInfo && canisterInfo.status!=3">
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Status</div>
                                                    <div class="data-value" v-if="canisterStatus"><span :class="`badge badge-dim badge-sm bg-outline-${checkICStatus.style}`">{{checkICStatus.label}}</span></div>
                                                </div>
                                            </li>
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Freezing Threshold</div>
                                                    <div class="data-value" v-if="canisterStatus">{{formatter(canisterStatus.settings.freezing_threshold)}} kB</div>
                                                </div>
                                            </li>
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Memory Size</div>
                                                    <div class="data-value" v-if="canisterStatus">{{formatter(canisterStatus.memory_size)}} kB</div>
                                                </div>
                                            </li>
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Installed Image</div>
                                                    <div class="data-value" v-if="imageList && canisterInfo">
                                                        <router-link :to="`/store/${canisterInfo.imageId+'-'+imageList[canisterInfo.imageId]?.code}`">{{imageList[canisterInfo.imageId]?.name}}</router-link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Created At</div>
                                                    <div class="data-value" v-if="canisterInfo"><span class="small">{{formatDate(canisterInfo.created)}}</span> </div>
                                                </div>
                                            </li>
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Updated At</div>
                                                    <div class="data-value" v-if="canisterInfo"><span class="small">{{formatDate(canisterInfo.updated)}}</span> </div>
                                                </div>
                                            </li>
                                            <li class="data-item">
                                                <div class="data-col">
                                                    <div class="data-label">Module Hash</div>
                                                    <div class="data-value text-ellipsis small"><span class="small">{{moduleHash.slice(0,8)+'...'+moduleHash.slice(-8)}}</span> <IconCopy :text="moduleHash" item="Module hash"/></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div><!-- .card-inner -->
                                </div><!-- .card-inner-group -->
                            </div><!-- card-aside -->
                            <div class="card-inner card-inner-lg">
                                <div class="nk-block-between pb-3">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title title"><em class="icon ni ni-file-docs"></em>  Canister Data</h5>
                                    </div>
                                    <div class="nk-block-head-content align-self-start d-lg-none">
                                        <a href="javascript:void(0)" class="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside"><em class="icon ni ni-menu-alt-r"></em></a>
                                    </div>
                                </div>
                                <div class="nk-block card card-bordered">
                                    <ul class="data-list is-compact" v-if="!canisterData && canisterInfo">
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="">UI for this canister image is not available. Check with Candid UI
                                                <a :href="`${config.IC_SCAN+canisterInfo.canisterId}`" target="_blank">{{canisterInfo.canisterId}}</a> <em class="icon ni ni-external"></em>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul class="data-list is-compact" v-if="canisterData">
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Symbol</div>
                                                <div class="data-value">
                                                    <img class="canister-logo" :src="canisterData.logo" v-if="canisterData.logo"/>
                                                    {{canisterData.symbol}} <IconCopy :text="canisterData.symbol" item="Symbol"/>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Name</div>
                                                <div class="data-value">{{canisterData.name}} &nbsp;<span class="badge bg-light">{{standard}}</span></div>
                                            </div>
                                        </li>
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Canister ID</div>
                                                <div class="data-value" v-if="canisterInfo">
                                                    {{canisterInfo.canisterId}} <IconCopy :text="canisterInfo.canisterId" item="Canister ID"/>
                                                    &nbsp;<button class="btn btn-sm btn-danger" @click="addToPlug"><em class="ni ni-wallet"></em> &nbsp; Add to My Wallet</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Total Supply</div>
                                                <div class="data-value">{{formatter(Number(canisterData.total_supply)/config.E8S)}}</div>
                                            </div>
                                        </li>
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Decimals</div>
                                                <div class="data-value">{{canisterData.decimals}}</div>
                                            </div>
                                        </li>
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Transfer Fee</div>
                                                <div class="data-value">{{Number(canisterData.transfer_fee)/config.E8S}}</div>
                                            </div>
                                        </li>
                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Owner</div>
                                                <div class="data-value">{{canisterData.owner}} <IconCopy :text="canisterData.owner" item="Owner"/></div>
                                            </div>
                                        </li>

                                        <li class="data-item">
                                            <div class="data-col">
                                                <div class="data-label w-30">Manage</div>
                                                <div class="data-value">
                                                    <div class="btn-group btn-group-sm mg-auto" aria-label="Canister Manage" v-if="canisterData">
                                                        <button @click="tokenAction('mint')" type="button" class="btn btn-sm btn-outline-light" v-if="standard=='DIP20'"><em class="icon ni ni-plus-round-fill text-primary"></em> Mint</button>
                                                        <button @click="tokenAction('transfer')" type="button" class="btn btn-sm btn-outline-light"><em class="icon ni ni-send"></em>Transfer</button>
                                                        <button @click="tokenAction('burn')" type="button" class="btn btn-sm btn-outline-light text-danger" v-if="standard=='DIP20'"><em class="icon ni ni-archived-fill text-danger"></em>Burn</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
<!--                                        <li class="data-item">-->
<!--                                            <div class="data-col">-->
<!--                                                <div class="data-label w-30">Status</div>-->
<!--                                                <div class="data-value"><span :class="`badge badge-dim badge-sm bg-outline-${checkStatus.style}`">{{checkStatus.label}}</span></div>-->
<!--                                            </div>-->
<!--                                        </li>-->

                                    </ul>
                                </div><!-- .nk-block-head -->
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title title"><em class="icon ni ni-user-group-fill"></em> Controllers</h5>
                                    </div>
                                </div>
                                <div class="card card-bordered">
                                    <table class="table table-tranx is-compact">
                                        <thead>
                                        <tr class="tb-tnx-head">
                                            <th>Role</th>
                                            <th>Principal</th>
                                            <th>Action</th>
                                        </tr></thead>
                                        <tbody>
                                        <tr class="tb-tnx-item" v-for="controller in canisterStatus.settings.controllers" v-if="canisterStatus">
                                            <td>
                                                <span :class="`badge bg-outline-danger`" v-if="config.CANISTER_MANAGER_ID == principalToText(controller)">BLACKHOLE</span>
                                            </td>
                                            <td><span class="small"> {{principalToText(controller)}} <IconCopy :text="principalToText(controller)" item="Principal"/></span></td>
                                            <td>
                                                <span class="small"><button class="btn btn-sm btn-danger" @click="addToPlug" v-if="config.CANISTER_MANAGER_ID == principalToText(controller)"> Remove</button></span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title title"><em class="icon ni ni-activity-round-fill"></em> Canister History</h5>
                                    </div>
                                </div>
                                <div class="card card-bordered">
                                    <table class="table table-tranx is-compact">
                                        <thead>
                                        <tr class="tb-tnx-head">
                                            <th>Action</th>
                                            <th>By</th>
                                            <th>Canister Name</th>
                                            <th>Image Name</th>
                                            <th>Time</th>
                                        </tr></thead>
                                        <tbody>
                                        <tr class="tb-tnx-item" v-for="(history, idx) in canisterHistory">
                                            <td>
                                                <span :class="`badge bg-outline-${badges[history.action]}`">{{history.action}}</span>
                                            </td>
                                            <td><span class="small"> {{principalToText(history.maker).slice(0,10)+'...'+principalToText(history.maker).slice(-9)}}</span></td>
                                            <td><span class="small">{{history.canisterName}}</span></td>
                                            <td><span class="small">{{history.imageName}}</span></td>
                                            <td>
                                                <span class="small">{{history.time}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div><!-- .card-inner -->

                        </div><!-- card-aside-wrap -->
                    </div><!-- .card -->
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
    .canister-logo{
        height: 28px;
    }
</style>