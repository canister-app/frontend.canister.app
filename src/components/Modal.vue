<script setup>
    console.log('call')
    const canisterModal = true;
</script>
<script>
    import LoginModal from './modals/LoginModal.vue'

    export default {
        components: { LoginModal },
        data() {
            return {

            }
        }
    }
</script>
<template>
    <LoginModal />
</template>