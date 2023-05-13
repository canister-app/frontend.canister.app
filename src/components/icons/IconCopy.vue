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
    <a v-if="!isCopied" href="javascript:void(0)" @click="copyToClipboard('1', 'Canister ID')" class="copy" title="Copy"><em class="icon ni ni-copy"></em></a>
    <em v-if="isCopied" class="icon ni ni-check-circle text-success"></em>
</template>
<style>
    .copy:hover{
        color: #ff0000;
    }
</style>