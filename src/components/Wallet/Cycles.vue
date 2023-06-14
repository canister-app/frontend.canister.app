<script>
    import {WalletManager} from "../../services/WalletManager";
    import moment from 'moment';
    import config from "@/config";
    import {walletData} from "@/services/store.js";
    import {principalToText, shortPrincipal} from "@/IC/utils.js"
    import IconCopy from "@/components/icons/IconCopy.vue";
    export default {
        components: {IconCopy},
        data() {
            return {
                currentAddress: walletData.account.address,
                config,
                moment,
                principalToText,
                shortPrincipal,
                cycleHistory: null,
                transactions: null,
                show_status,
                show_cycle_status
            }
        },
        methods: {
            async getCycleHistory(){
                let _cyclesHistory = await WalletManager.getCycleHistory();
                this.cycleHistory = _cyclesHistory.sort( function ( a, b ) { return Number(b[1].time) - Number(a[1].time); } );
            },
            async getDepositHistory(){
                let _transactions = await WalletManager.getMyDeposit();
                this.transactions = _transactions.sort( function ( a, b ) { return Number(b[1].completed_at) - Number(a[1].completed_at); } );
                console.log('transactions: ', _transactions);
            }
        },
        mounted() {
            this.getCycleHistory()
        }
    }
    function show_status(status){
        switch (Number(status)) {
            case 0: return "Pending";break;
            case 1: return "Depositing";break;
            case 2: return "Completed";break;
        }
    }
    function show_cycle_status(status){
        switch (Number(status)) {
            case 0: return "Deposit";break;
            case 1: return "Create";break;
            case 2: return "Topup";break;
        }
    }

</script>
<template>
    <div class="nk-block">
        <h6 class="lead-text mb-3">Recent Activities</h6>
        <ul class="nav nav-tabs nav-tabs-s1" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="transactions-tab" @click="getCycleHistory" data-bs-toggle="tab" data-bs-target="#cycles"  type="button" role="tab"> <span class="ni ni-activity"></span>&nbsp; Cycles Histories </button>
            </li>
            <li class="nav-item " role="presentation">
                <button class="nav-link" id="owned-tab" @click="getDepositHistory" data-bs-toggle="tab" data-bs-target="#deposit"  type="button" role="tab"> <span class="ni ni-plus-c"></span>&nbsp;  Deposit Histories </button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="cycles" role="tabpanel">
                <div class="nk-tb-list nk-tb-ulist is-compact border round-sm">
                    <div class="nk-tb-item nk-tb-head">
                        <div class="nk-tb-col">
                            <span class="sub-text">Action</span>
                        </div>
                        <div class="nk-tb-col tb-col-sm">
                            <span class="sub-text">From </span>
                        </div>
                        <div class="nk-tb-col tb-col-sm">
                            <span class="sub-text">To</span>
                        </div>
                        <div class="nk-tb-col tb-col-xxl text-end">
                            <span class="sub-text">Amount</span>
                        </div>
                        <div class="nk-tb-col">
                            <span class="sub-text">Time</span>
                        </div>
                    </div>
                    <div class="nk-tb-item" v-if="cycleHistory" v-for="cycles in cycleHistory">
                        <div class="nk-tb-col">
                            <span class="sub-text">{{show_cycle_status(cycles[1].method)}}</span>
                        </div>
                        <div class="nk-tb-col tb-col-sm">
                            <span class=" sub-text"> {{shortPrincipal(principalToText(cycles[1].from))}} <IconCopy :text="principalToText(cycles[1].from)" /></span>
                        </div>
                        <div class="nk-tb-col tb-col-sm">
                            <span class=" sub-text"> {{shortPrincipal(principalToText(cycles[1].to))}} <IconCopy :text="principalToText(cycles[1].to)"/></span>
                        </div>
                        <div class="nk-tb-col tb-col-xxl text-end">
                            <span :class="`fw-bold amount sub-text ${cycles[1].method==0?'text-success':'text-danger'}`">
                                <i :class="`ni ${cycles[1].method==0?'ni-plus':'ni-minus'}`"></i> {{(Number(cycles[1].amount)/config.CYCLES).toFixed(4)}} T
                            </span>
                        </div>
                        <div class="nk-tb-col">
                            <span class="sub-text">{{moment(Number(cycles[1].time)/1_000_000).fromNow()}}</span>
                        </div>
                    </div>
                </div><!-- .nk-tb-list -->
            </div>
            <div class="tab-pane fade" id="deposit" role="tabpanel">
                <div class="nk-tb-list nk-tb-ulist is-compact border round-sm">
                    <div class="nk-tb-item nk-tb-head">
                        <div class="nk-tb-col">
                            <span class="sub-text">Action</span>
                        </div>
                        <div class="nk-tb-col tb-col-sm">
                            <span class="sub-text">ICP Amount</span>
                        </div>
                        <div class="nk-tb-col tb-col-xxl">
                            <span class="sub-text">Cycles</span>
                        </div>
                        <div class="nk-tb-col">
                            <span class="sub-text">Time</span>
                        </div>
                        <div class="nk-tb-col">
                            <span class="sub-text">Status</span>
                        </div>
                    </div>
                    <div class="nk-tb-item" v-for="transaction in transactions">
                        <div class="nk-tb-col">
                            <div class="nk-tnx-type-icon bg-success-dim text-success">
                                <em class="icon ni ni-arrow-up-right"></em>
                            </div>
                        </div>
                        <div class="nk-tb-col tb-col-sm">
                            <span class="fw-bold amount text-success"> <i class="ni ni-arrow-up-right"></i> {{(Number(transaction[1].amount)/config.E8S).toFixed(4)}}</span>
                        </div>
                        <div class="nk-tb-col tb-col-xxl">
                            <span class="fw-bold amount text-primary"><i class="ni ni-arrow-down-right text-primary"></i> {{(Number(transaction[1].cycles)/config.CYCLES).toFixed(4)}} T</span>
                        </div>
                        <div class="nk-tb-col">
                            <span class="sub-text">{{moment(Number(transaction[1].created_at)/1_000_000).fromNow()}}</span>
                        </div>
                        <div class="nk-tb-col">
                            <span class="sub-text">{{show_status(transaction[1].status)}}</span>
                        </div>
                    </div>
                </div><!-- .nk-tb-list -->
            </div>
        </div>

    </div>
</template>