<script>
    import LoginModal from './modals/LoginModal.vue'
    import DeployModal from './modals/DeployModal.vue'
    import CartModal from "./modals/CartModal.vue";

    export default {
        components: {CartModal, LoginModal, DeployModal },
        data() {
            return {}
        }
    }
</script>
<template>
    <LoginModal />
    <DeployModal />
    <CartModal />
</template>