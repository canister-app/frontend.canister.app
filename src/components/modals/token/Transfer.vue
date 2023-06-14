<script>
    import IconRequired from '../../icons/IconRequired.vue'
    import TokenManager from "../../../services/TokenManager.js";
    import EventBus from "../../../services/EventBus";
    import {useToast} from "vue-toastification";
    import config from "../../../config";
    import { showLoading, formatter } from "@/IC/utils.js";
    import {principalToText} from "../../../IC/utils";
    import {walletData} from "../../../services/store";
    import { Money3Component } from "v-money3";

    export default {
        components: {IconRequired, money3: Money3Component },
        props: ['action', 'symbol', 'transfer_fee', 'canister_id', 'standard'],
        computed:{
            config_mask() {
                return {
                    decimal: ".",
                    thousands: ",",
                    prefix: "",
                    suffix: "",
                    precision: 0,
                    masked: false /* doesn't work with directive */,
                };
            },
        },
        data() {
            return {
                formatter,
                config,
                to: 'yj7m2-unvhj-2qa4k-l4n7z-irhtp-5z2tr-zgea7-z5nwj-ph7pu-z5aee-qae',
                amount: 0,
                balance: 0,
                fees: (Number(this.transfer_fee)/config.E8S) + ' '+this.symbol
            }
        },
        methods: {
            selectMax(){
              this.amount = this.balance;
            },
            async burn(){
                window.Swal.fire({
                    icon: 'question',
                    title: 'Confirmation',
                    html: 'Are you sure you want to burn '+formatter(this.amount)+' '+this.symbol+' from your wallet?',
                    showCancelButton: true,
                    confirmButtonText: 'Burn token',
                    confirmButtonColor: '#bbbbbb'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        showLoading('Burning '+formatter(this.amount)+ ' '+this.symbol+' token, please wait...');
                        let _result = await TokenManager.burn(this.standard, this.canister_id, this.amount);
                        if("Ok" in _result){
                            let _html = '<strong>'+formatter(this.amount)+'</strong> <strong>'+this.symbol+'</strong> has been burned successfully!'
                            window.Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                html: _html,
                            })
                            await this.getBalance();
                            this.emitData();//Emit data to reload balance
                        }else{
                            let _err = '';
                            for (const [key] of Object.entries(_result.Err)) {
                                _err = key;
                            }
                            window.Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                html: '<span class="text-danger">'+_err+"</span>",
                            })
                        }
                    }
                })
            },
            emitData(){
              EventBus.emit('canisterData', true);
              EventBus.emit('showTokenModal', {status: false});
            },
            async transfer(){
                window.Swal.fire({
                    icon: 'question',
                    title: 'Confirmation',
                    html: 'Confirm '+this.action+' <span class="text-danger">'+formatter(this.amount)+'</span> <strong>'+this.symbol+'</strong> to <span class="text-danger">'+this.to+'</span>',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: '#bbbbbb'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let _msg = (this.action=='transfer'?'Transferring ':'Minting ')+'<strong>'+formatter(this.amount)+ ' ' +this.symbol+'</strong>, please wait...';
                        showLoading(_msg);
                        let _result = await TokenManager[this.action](this.standard, this.canister_id, this.to, this.amount);
                        if("Ok" in _result){
                            let _html = this.action=='mint'?'<strong>'+formatter(this.amount)+'</strong> <strong>'+this.symbol+'</strong> has been minted to <strong>'+this.to+'</strong> successfully!':'You\'ve transferred <strong>'+this.amount+'</strong> <strong>'+this.symbol+'</strong> to <strong>'+this.to+'</strong>'
                            window.Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                html: _html,
                            })
                            await this.getBalance();
                            this.emitData();//Emit data to reload balance
                        }else{
                            let _err = '';
                            for (const [key] of Object.entries(_result.Err)) {
                                _err = key;
                            }
                            window.Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                html: '<span class="text-danger">'+_err+"</span>",
                            })
                        }
                    }
                })
            },
            async getBalance(){
                this.balance = 0;
                let _balance = await TokenManager.balance(this.standard, this.canister_id);
                this.balance = Number(_balance)/config.E8S
            },
        },
        watch: {
            'canister_id'(val){//Watching modal change
                this.getBalance();
            }
        },
        mounted() {
            this.getBalance();
        },
        setup() {
            const toast = useToast();
            return {toast};
        },
    }
</script>
<template>
    <div class="pl-10 pb-3">
        <div class="row gy-4" v-if="action=='burn'">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="form-label" v-if="symbol">Amount of <span class="text-blue">{{symbol}}</span> to be burned: <IconRequired /></label>
                    <div class="float-right">Balance: <a href="javascript:void(0)" title="Select max" class="" @click="selectMax">{{formatter(balance)}}</a> {{symbol}}</div>
                    <div class="form-control-wrap">
                        <money3 class="form-control" v-model="amount" v-bind="config_mask" required />
                    </div>
                </div>
            </div>
            <div class="col-sm-12 text-center">
                <button type="submit" class="btn btn-danger btn-block" @click="burn">
                    <em class="icon ni ni-delete"></em><span class="text-capitalize">Burn</span>
                </button>
            </div>
        </div>
        <div class="row gy-4" v-if="action!='burn'">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="form-label" v-if="symbol"><span class="text-capitalize">{{action}}</span> <span class="text-blue">{{symbol}}</span> to Principal <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" placeholder="Principal" required v-model="to">
                    </div>
                </div>
            </div>

            <div :class="`${action=='transfer'?'col-sm-6':'col-sm-12'}`">
                <div class="form-group">
                    <label class="form-label">Amount to {{action}}<IconRequired /></label>
                    <div class="float-right" v-if="action=='transfer'">Balance: <a href="javascript:void(0)" title="Select max" class="" @click="selectMax">{{formatter(balance)}}</a> <span class="text-blue">{{symbol}}</span></div>
                    <div class="form-control-wrap">
                        <money3 class="form-control" v-model="amount" v-bind="config_mask" required />
                    </div>
                </div>
            </div>
            <div class="col-sm-6" v-if="action=='transfer'">
                <div class="form-group">
                    <label class="form-label text-capitalize">{{action}} fee</label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" v-model="fees" placeholder="0" disabled>
                    </div>
                </div>
            </div>
            <div class="col-sm-12" v-if="standard=='ICRC1'">
                <div class="alert alert-warning alert-icon">
                    <em class="icon ni ni-alert-circle"></em> With the ICRC1 standard, the  <strong>transfer</strong> action is equivalent to <strong>minting</strong> token for another principal. If you are the owner of the Token, you cannot transfer (mint) to yourself.
                </div>
            </div>
            <div class="col-sm-12 text-center">
                <button type="submit" class="btn btn-primary btn-block" @click="transfer">
                    <em class="icon ni ni-send"></em><span class="text-capitalize">{{action}}</span>
                </button>
            </div>
        </div>

    </div>
</template>