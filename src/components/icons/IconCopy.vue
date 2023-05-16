<script>
    import {copyToClipboard} from "@/IC/utils.js";
    export default {
        props: ['text', 'item'],
        data(){
            return{
                isCopied: false
            }
        },
        methods: {
            async copyToClipboard(){
                copyToClipboard(this.text, this.item);
                this.changeCopyBtn();
            },
            changeCopyBtn(){
                this.isCopied = true;
                setInterval(()=>{
                    this.isCopied = false;
                }, 3000)
            }
        }
    };

</script>
<template>
    <em v-if="!isCopied" href="javascript:void(0)" @click="copyToClipboard('1', 'Canister ID')" title="Copy" class="copy ni ni-copy"></em>
    <em v-else class="ni ni-check-circle-fill text-success"></em>
</template>
<style>
    .copy{
        cursor: pointer;
    }
    .copy:hover{
        color: #ff0000;
    }
</style>