<script setup>
    import {WalletManager} from "../../services/WalletManager";
    import moment from 'moment';
    import {walletData} from "@/services/store.js";
    const currentAddress = walletData.account.address;
    const transactions = await WalletManager.getICPTransactions(walletData.account.address);

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
                    <span class="sub-text">From/To</span>
                </div>
                <div class="nk-tb-col tb-col-xxl">
                    <span class="sub-text">Amount</span>
                </div>
                <div class="nk-tb-col">
                    <span class="sub-text">Time</span>
                </div>
            </div>
            <div class="nk-tb-item" v-if="transactions" v-for="transaction in transactions">
                <div class="nk-tb-col">
                    <a href="#"><span class="fw-bold"><small><span v-if="transaction.to==currentAddress" class="text-success"><i class="ni ni-arrow-down-right"></i> Received</span> <span class="text-danger" v-if="transaction.to!=currentAddress"> <i class="ni ni-arrow-up-right"></i> Sent</span></small></span></a>
                </div>
                <div class="nk-tb-col tb-col-sm">
                    <span class="tb-product">
                        <span class="title"><small>
                            {{transaction.to==currentAddress?'from:':'to:'}} <router-link :to="`/account/${transaction.to==currentAddress?transaction.from:transaction.to}`">{{transaction.to==currentAddress?transaction.from:transaction.to}}</router-link>
                        <div class="sub-text">
                            TxnHash: <a :href="`https://icscan.io/transaction/${transaction.hash}`" class="text-base" target="_blank">{{transaction.hash}}</a> <em class="ni ni-external"></em>
                        </div>
                        </small></span>
                    </span>
                </div>
                <div class="nk-tb-col tb-col-xxl">
                    <span :class="`amount ${transaction.to==currentAddress?'text-success':'text-danger'}`">{{transaction.amount}}</span>
                </div>
                <div class="nk-tb-col">
                    <span class="sub-text">{{moment(transaction.timestamp).fromNow()}}</span>
                </div>

            </div>
        </div><!-- .nk-tb-list -->
    </div>
</template>