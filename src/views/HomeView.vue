<script >
  import { ref } from "vue";
  import _api from "@/IC/api";
  import moment from "moment";
  import config from "@/config"
  import IconICP from "@/components/icons/IconICP.vue";
  import {formatCurrency} from "../IC/utils";
  import IconCopy from "../components/icons/IconCopy.vue";
  import IconLoading from "../components/icons/IconLoading.vue";
  import {walletData} from "../services/store";
  export default {
    components: {IconCopy, IconICP, IconLoading },
    data(){
      return {
          pairs: null,
          config,
          formatCurrency,
          walletData,
          counter: 60,
          update_interval: null,
          counter_interval: null,
          isLoading: false,
          autoReload: true,
      }
    },
    methods: {
        async getPairs(){
            this.isLoading = true;
            let _pairs = await _api.connect().canister('4qix3-5iaaa-aaaag-qbljq-cai').getAllToken([]);
            let _newPairs = [];
            _pairs.forEach(function(pair){
                let _tokenInfo = {
                    canisterId: pair.address,
                    standard: pair.standard,
                    token0: pair.name,
                    token1: pair.name,
                    name: pair.name,
                    volume: pair.totalVolumeUSD,
                    swapCount: pair.txCount,
                    price: pair.name=='ICP'?walletData.icpPrice:Number(pair.priceUSD),
                    score: 1,
                    updated: '',
                    change24h: pair.priceUSDChange
                };
                _newPairs.push(_tokenInfo)
            })
            this.pairs = _newPairs.sort( function ( a, b ) { return Number(b.volume) - Number(a.volume); } );
            this.isLoading = false;
        },
        async getICPSwap(){
            let _pairs = await _api.connect().canister('j4d4d-pqaaa-aaaak-aanxq-cai').getPairs2([], [], [], []);
            let _newPairs = [];
            _pairs.data.forEach(function(pair){
                let _standard = Object.keys(pair[1].pair.token0[2]);
                let _tokenInfo = {
                    canisterId: pair[1].pair.token0[0],
                    standard: _standard[0],
                    token0: pair[1].pair.token0[1],
                    token1: pair[1].pair.token1[1],
                    name: pair[1].pair.token0[1],
                    volume: pair[1].liquidity[0].vol.value0,
                    swapCount: pair[1].liquidity[0].swapCount,
                    price: Number(pair[1].liquidity[0].value1)/Number(pair[1].liquidity[0].value0),
                    score: pair[1].score,
                    updated: moment.utc().fromNow(Number(pair[1].liquidity[0].priceWeighted.updateTime)),
                    change24h: 0
                };
                if(_tokenInfo.name == "ITest" || _tokenInfo.name == 'Cycles'){
                }else{
                    _newPairs.push(_tokenInfo)
                }

            })
            this.pairs = _newPairs;
        },
        async getRateICP(){
          await walletData.getRateICP();
        },
        setInterval(){
            this.update_interval = setInterval(()=>{
                this.getPairs();
                this.getRateICP();
                this.counter = 60;
            }, 60*1000)
            this.counter_interval = setInterval(this.incrementSeconds, 1000)
        },
        incrementSeconds() {
            this.counter -= 1;
        },
        toggleReload(){
            this.autoReload = !this.autoReload;
            if(this.autoReload){
                this.setInterval();
            }else{
                this.clearInterval();
            }
        },
        clearInterval(){
            clearInterval(this.update_interval);
            clearInterval(this.counter_interval);
        }
    },
    mounted() {
        this.setInterval();
        this.getPairs();
        this.getRateICP();
    },
    unmounted() {
      this.clearInterval()
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
                                <h3 class="nk-block-title page-title">Canister Dashboard</h3>
                                <div class="nk-block-des text-soft">
                                    <p>Realtime token tracking on the Internet Computer.</p>
                                </div>
                            </div><!-- .nk-block-head-content -->
<!--                            <div class="nk-block-head-content">-->
<!--                                <div class="toggle-wrap nk-block-tools-toggle">-->
<!--                                    <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em class="icon ni ni-more-v"></em></a>-->
<!--                                    <div class="toggle-expand-content" data-content="pageMenu">-->
<!--                                        <ul class="nk-block-tools g-3">-->
<!--                                            <li><a href="#" class="btn btn-white btn-dim btn-outline-primary"><em class="icon ni ni-download-cloud"></em><span>Export</span></a></li>-->
<!--                                            <li><a href="#" class="btn btn-white btn-dim btn-outline-primary"><em class="icon ni ni-reports"></em><span>Reports</span></a></li>-->
<!--                                        </ul>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>&lt;!&ndash; .nk-block-head-content &ndash;&gt;-->
                        </div><!-- .nk-block-between -->
                    </div><!-- .nk-block-head -->
                    <div class="nk-block">
                        <div class="row g-gs">

                            <div class="col-lg-10">
                                <div class="card card-bordered card-full">
                                    <div class="card-inner">
                                        <div class="card-title-group">
                                            <div class="card-title">
                                                <h6 class="title"><span class="me-2">Canister Tokens</span>
                                                    <a href="javascript:void(0)" @click="getPairs" class="link d-none d-sm-inline"><em class="ni ni-reload"></em> Refresh</a>

                                                </h6>
                                            </div>
                                            <div class="card-tools">
                                                <small>
                                                    Auto reload after: {{counter}} seconds
                                                    [
                                                    <a href="javascript:void(0)" @click="toggleReload">
                                                        <span v-if="autoReload">disable</span>
                                                        <span v-if="!autoReload">enable</span>
                                                    </a>
                                                    ]</small>
<!--                                                <ul class="card-tools-nav">-->

<!--                                                    <li><a href="#"><span>Buy</span></a></li>-->
<!--                                                    <li><a href="#"><span>Sell</span></a></li>-->
<!--                                                    <li class="active"><a href="#"><span>All</span></a></li>-->
<!--                                                </ul>-->
                                            </div>
                                        </div>
                                    </div><!-- .card-inner -->
                                    <div class="card-inner p-0 border-top">
                                        <div class="nk-tb-list nk-tb-orders">
                                            <div class="nk-tb-item nk-tb-head">
                                                <div class="nk-tb-col"><span>#</span></div>
                                                <div class="nk-tb-col nk-tb-orders-type"></div>
                                                <div class="nk-tb-col"><span>Name</span></div>
                                                <div class="nk-tb-col text-end"><span>Price</span></div>
                                                <div class="nk-tb-col text-center"><span>Price change</span></div>
                                                <div class="nk-tb-col tb-col-sm text-end"><span>Volume 24h</span></div>
                                                <div class="nk-tb-col tb-col-sm text-end"><span>Volume</span></div>
                                                <div class="nk-tb-col tb-col-sm text-end "><span>Marketcap</span></div>
                                                <div class="nk-tb-col text-center"><span>Chart</span></div>
                                            </div><!-- .nk-tb-item -->
                                            <div class="nk-tb-item" v-if="isLoading">
                                                <IconLoading /> Loading tokens...
                                            </div>
                                            <div class="nk-tb-item" v-else v-for="(pair, idx) in pairs">
                                                <div class="nk-tb-col">
                                                    <span class="tb-sub">{{idx+1}}.</span>
                                                </div>
                                                <div class="nk-tb-col nk-tb-orders-type">
                                                    <ul class="icon-overlap">
                                                        <li class="w-40px">
                                                            <img :src="`https://${config.CANISTER_STORAGE_ID}.raw.icp0.io/${pair.canisterId}.png`" />
<!--                                                            <em class="bg-primary-dim icon-circle icon ni ni-info"></em>-->
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="nk-tb-col">
                                                    <span class="tb-lead">{{pair.name}} &nbsp;<span class="badge bg-light text-uppercase">{{pair.standard}}</span></span>
                                                    <span class="tb-sub">{{pair.canisterId}} <IconCopy :text="pair.canisterId" /></span>
                                                </div>
                                                <div class="nk-tb-col text-right">
                                                    <span class="tb-amount">{{formatCurrency((pair.price/walletData.icpPrice).toFixed(6), false)}} ICP</span>
                                                    <span class="tb-amount-sm">${{formatCurrency((Number(pair.price)).toFixed(6), false)}}</span>
                                                </div>
                                                <div class="nk-tb-col text-center">
                                                    <span :class="`tb-sub ${pair.change24h>0?'text-success':pair.change24h<0?'text-danger':''}`">
                                                        <em class="ni ni-arrow-up fw-bold" v-if="pair.change24h>0"></em>
                                                        <em class="ni ni-arrow-down fw-bold" v-if="pair.change24h <0"></em>
                                                        {{pair.change24h.toFixed(2)}}%
                                                    </span>
                                                </div>


                                                <div class="nk-tb-col tb-col-xl text-end">
                                                    <span class="tb-amount">{{formatCurrency((Number(pair.volume)).toFixed(0), false)}} <span>ICP</span></span>
                                                </div>
                                                <div class="nk-tb-col text-end">
                                                    <span class="tb-amount">{{formatCurrency((Number(pair.volume)).toFixed(4), true)}} <span>ICP</span></span>
                                                </div>
                                               <div class="nk-tb-col text-end">
                                                   <span class="tb-sub">{{formatCurrency((Number(pair.volume)).toFixed(4), true)}} <span>ICP</span></span>
                                                </div>

                                                <div class="nk-tb-col text-center">
                                                    <div class="gfx mini-chart" data-color="#9cabff">
                                                        <img src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/8916.svg">
                                                    </div>
                                                </div>
                                            </div><!-- .nk-tb-item -->
                                        </div>
                                    </div><!-- .card-inner -->
                                    <div class="card-inner-sm border-top text-center d-sm-none">
                                        <a href="#" class="btn btn-link btn-block">See History</a>
                                    </div><!-- .card-inner -->
                                </div><!-- .card -->
                            </div><!-- .col -->
                            <div class="col-lg-2">
                                <div class="row g-gs">
                                    <div class="col-md-6 col-lg-12">
                                        <div class="card card-bordered card-full">
                                            <div class="card-inner">
                                                <div class="card-title-group align-start mb-2">
                                                    <div class="card-title">
                                                        <h6 class="title">Top Tokens</h6>
                                                        <p>In last 15 days overview.</p>
                                                    </div>
                                                    <div class="card-tools mt-n1 me-n1">
                                                        <div class="drodown">
                                                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#" class="active"><span>15 Days</span></a></li>
                                                                    <li><a href="#"><span>30 Days</span></a></li>
                                                                    <li><a href="#"><span>3 Months</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div><!-- .card-title-group -->
                                                <div class="nk-coin-ovwg">
<!--                                                    <div class="nk-coin-ovwg-ck">-->
<!--                                                        <canvas class="coin-overview-chart" id="coinOverview"></canvas>-->
<!--                                                    </div>-->
                                                    <ul class="nk-coin-ovwg-legends">
                                                        <li><span class="dot dot-lg sq" data-bg="#f98c45" style="background: #f98c45"></span><span>ckBTC</span></li>
                                                        <li><span class="dot dot-lg sq" data-bg="#9cabff" style="background: #9cabff"></span><span>CHAT</span></li>
                                                        <li><span class="dot dot-lg sq" data-bg="#8feac5" style="background: #8feac5"></span><span>SNS1</span></li>
                                                        <li><span class="dot dot-lg sq" data-bg="#6b79c8" style="background: #6b79c8"></span><span>OT</span></li>
                                                        <li><span class="dot dot-lg sq" data-bg="#79f1dc" style="background: #79f1dc"></span><span>OGY</span></li>
                                                    </ul>
                                                </div><!-- .nk-coin-ovwg -->
                                            </div><!-- .card-inner -->
                                        </div><!-- .card -->
                                    </div><!-- .col -->
                                    <div class="col-md-6 col-lg-12">
                                        <div class="card card-bordered card-full">
                                            <div class="card-inner">
                                                <div class="card-title-group align-start mb-3">
                                                    <div class="card-title">
                                                        <h6 class="title">User Activities</h6>
                                                        <p>In last 30 days <em class="icon ni ni-info" data-bs-toggle="tooltip" data-bs-placement="right" title="Referral Informations"></em></p>
                                                    </div>
                                                    <div class="card-tools mt-n1 me-n1">
                                                        <div class="drodown">
                                                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                                <ul class="link-list-opt no-bdr">
                                                                    <li><a href="#"><span>15 Days</span></a></li>
                                                                    <li><a href="#" class="active"><span>30 Days</span></a></li>
                                                                    <li><a href="#"><span>3 Months</span></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="user-activity-group g-4">
                                                    <div class="user-activity">
                                                        <em class="icon ni ni-users"></em>
                                                        <div class="info">
                                                            <span class="amount">345</span>
                                                            <span class="title">Direct Join</span>
                                                        </div>
                                                        <div class="gfx" data-color="#9cabff">
                                                            <svg enable-background="new 0 0 48 17.5" version="1.1" viewBox="0 0 48 17.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill="currentColor" d="m1.2 17.4h-0.3c-0.5-0.1-0.8-0.7-0.7-1.2 2-7.2 5-12.2 8.8-14.7 1.5-1 3-1.5 4.5-1.4 4.9 0.3 7.2 4.9 9 8.5 0.3 0.4 0.5 0.8 0.7 1.2 1 1.8 2.7 3.9 4.5 4.3 0.9 0.2 1.7-0.1 2.6-0.8 1.8-1.4 3-3.7 4.1-5.9 0.5-1 1-1.9 1.5-2.9 1-1.5 2.8-3.5 4.9-3.8 1.1-0.1 2.2 0.3 3.1 1 1.3 1.1 1.9 2.6 2.4 4.1 0.4 1 0.7 1.9 1.2 2.6 0.3 0.4 0.2 1.1-0.2 1.4s-1.1 0.2-1.4-0.2c-0.7-0.9-1.1-2-1.5-3-0.5-1.3-1-2.5-1.9-3.3-0.5-0.4-1-0.6-1.5-0.5-1.3 0.2-2.7 1.6-3.5 2.8-0.5 0.8-1 1.8-1.4 2.7-1.2 2.4-2.4 4.9-4.6 6.5-1.3 1.1-2.8 1.5-4.2 1.2-3.1-0.6-5.1-3.9-5.9-5.3-0.2-0.4-0.4-0.8-0.6-1.3-1.7-3.4-3.5-7.2-7.3-7.4-1.1-0.1-2.1 0.3-3.3 1-3.5 2.4-6.2 7-8 13.7-0.2 0.4-0.6 0.7-1 0.7z" />
                                                                        </svg>
                                                        </div>
                                                    </div>
                                                    <div class="user-activity">
                                                        <em class="icon ni ni-users"></em>
                                                        <div class="info">
                                                            <span class="amount">49</span>
                                                            <span class="title">Referral Join</span>
                                                        </div>
                                                        <div class="gfx" data-color="#ccd4ff">
                                                            <svg enable-background="new 0 0 48 17.5" version="1.1" viewBox="0 0 48 17.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill="currentColor" d="m1.2 17.4h-0.3c-0.5-0.1-0.8-0.7-0.7-1.2 2-7.2 5-12.2 8.8-14.7 1.5-1 3-1.5 4.5-1.4 4.9 0.3 7.2 4.9 9 8.5 0.3 0.4 0.5 0.8 0.7 1.2 1 1.8 2.7 3.9 4.5 4.3 0.9 0.2 1.7-0.1 2.6-0.8 1.8-1.4 3-3.7 4.1-5.9 0.5-1 1-1.9 1.5-2.9 1-1.5 2.8-3.5 4.9-3.8 1.1-0.1 2.2 0.3 3.1 1 1.3 1.1 1.9 2.6 2.4 4.1 0.4 1 0.7 1.9 1.2 2.6 0.3 0.4 0.2 1.1-0.2 1.4s-1.1 0.2-1.4-0.2c-0.7-0.9-1.1-2-1.5-3-0.5-1.3-1-2.5-1.9-3.3-0.5-0.4-1-0.6-1.5-0.5-1.3 0.2-2.7 1.6-3.5 2.8-0.5 0.8-1 1.8-1.4 2.7-1.2 2.4-2.4 4.9-4.6 6.5-1.3 1.1-2.8 1.5-4.2 1.2-3.1-0.6-5.1-3.9-5.9-5.3-0.2-0.4-0.4-0.8-0.6-1.3-1.7-3.4-3.5-7.2-7.3-7.4-1.1-0.1-2.1 0.3-3.3 1-3.5 2.4-6.2 7-8 13.7-0.2 0.4-0.6 0.7-1 0.7z" />
                                                                        </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-activity-ck">
                                                <canvas class="usera-activity-chart" id="userActivity"></canvas>
                                            </div>
                                        </div><!-- .card -->
                                    </div><!-- .col -->
                                </div><!-- .row -->
                            </div><!-- .col -->
                        </div><!-- .row -->
                    </div><!-- .nk-block -->
                </div>
            </div>
        </div>
    <!-- content @e -->
</template>
<style>
    .mini-chart{
        /*border: 1px solid #dbdfea;*/
        padding: 3px;
        width: 100px;
    }
</style>