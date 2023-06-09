<script setup>
    import {WalletManager} from "../../services/WalletManager";
    import moment from 'moment';
    import config from "@/config";
    import {walletData} from "@/services/store.js";
    const currentAddress = walletData.account.address;
    const transactions = await WalletManager.getMyDeposit();
    transactions.sort( function ( a, b ) { return Number(b[1].completed_at) - Number(a[1].completed_at); } );

    function show_status(status){
        switch (Number(status)) {
            case 0: return "Pending";break;
            case 1: return "Depositing";break;
            case 2: return "Completed";break;
        }
    }

</script>
<template>
    <div class="nk-block">
        <h6 class="lead-text mb-3">Recent Activities</h6>
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
            <div class="nk-tb-item" v-if="transactions" v-for="transaction in transactions">
                <div class="nk-tb-col">
                    <span class="sub-text text-danger">Deposit</span>
                </div>
                <div class="nk-tb-col tb-col-sm">
                    <span class="fw-bold amount text-danger"> <i class="ni ni-arrow-up-right"></i> {{(Number(transaction[1].amount)/config.E8S).toFixed(4)}}</span>
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
</template>