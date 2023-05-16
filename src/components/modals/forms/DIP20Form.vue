<script>
    import IconRequired from '../../icons/IconRequired.vue'
    import { Money3Component } from "v-money3";
    export default {
        components: {IconRequired, money3: Money3Component },
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
    }
</script>
<template>
    <div class="pl-10 pb-3">
        <div class="row gy-4">
            <input type="hidden" name="token_standard" value="DIP20">
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="tokenName">Token Name <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" id="tokenName" name="token_name" placeholder="Ex: Canister Token" required>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="tokenSymbol">Token Symbol <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" id="tokenSymbol" name="token_symbol" placeholder="Ex: XCANIC" required>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="form-label" for="tokenLogo">Token logo (best size: 200x200) <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="file" class="form-control" name="token_logo" id="tokenLogo" placeholder="Choose Token Logo" required>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="totalSupply">Total supply <IconRequired /></label>
                    <div class="form-control-wrap">
                        <money3 v-bind="config_mask" :modelValue="0" type="number" class="form-control" id="totalSupply" name="total_supply" placeholder="100,000,000" required />
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="decimals">Decimals <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="number" class="form-control" id="decimals" name="decimals" placeholder="8" value="8" required>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="transfer_fee">Transfer fee ($TOKEN) <IconRequired /></label>
                    <div class="form-control-wrap">
                        <money3 :precision="6" :modelValue="0" type="text" class="form-control" id="transfer_fee" name="transfer_fee" placeholder="0.0001" required />
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="principal_address">Token Owner (Principal) <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" id="principal_address" name="token_owner" placeholder="Principal" required>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>