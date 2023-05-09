<script setup>
    import { validatePrincipal } from "@/IC/utils.js"
    import { ref } from 'vue';
    const inputArray = ref([]);
    const addInput = ()=>{
        inputArray.value.push('input');
    }
    const removeInput = (idx)=>{
        inputArray.value.splice(idx, 1);
    }
    const checkPrincipal = (principal)=>{
        if(!validatePrincipal(principal)){

        }

    }
</script>
<template>
    <div class="pl-10 pb-3">
        <div class="row gy-4">
            <input type="hidden" name="token_standard" value="Threshold">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="form-label">Signers (Principal)</label>
<!--                    <input type="hidden" class="form-control" placeholder="Signer principal #1" name="singer[]" value="2vxsx-fae">-->
                    <div class="form-control-wrap pt-1">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Signer principal #1" name="signer[]" required>
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary" @click="addInput" title="Add new signer"><em class="icon ni ni-plus-circle"></em></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-control-wrap pt-1" v-for="(input, index) in inputArray" :key="index">
                        <div class="input-group">
                            <input type="text" class="form-control" :placeholder="`Signer principal #${index+2}`" name="signer[]" required>
                            <div class="input-group-append">
                                <button type="button" class="btn btn-danger" @click="removeInput(index)" title="Remove this signer"><em class="icon ni ni-minus-circle"></em></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>