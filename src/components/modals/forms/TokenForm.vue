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
                    modelModifiers: {
                        number: true,
                    },
                    masked: false /* doesn't work with directive */,
                };
            },
        },
    }
</script>
<template>
    <div class="pl-10 pb-3">
        <div class="row gy-4">
            <input type="hidden" name="token_standard" value="ICRC1">
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
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="decimals">Decimals <IconRequired /></label>
                    <div class="form-control-wrap">
                        <input type="number" class="form-control" id="decimals" placeholder="8" disabled>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="transfer_fee">Transfer fee ($TOKEN) <IconRequired /></label>
                    <div class="form-control-wrap">
                        <money3 type="text" :precision="4" class="form-control" id="transfer_fee" name="transfer_fee" placeholder="0.0001" required />
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
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