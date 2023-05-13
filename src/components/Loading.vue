<script setup>
    import {defineProps} from "@vue/runtime-core";
    import IconLoading from "./icons/IconLoading.vue";
    const props = defineProps({
        message: String
    })
</script>
<template>
    <div class="nk-tb-item">
        <div class="nk-tb-col">
            <IconLoading /> {{message}}...
        </div>
    </div>
</template>