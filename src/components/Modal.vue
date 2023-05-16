<script>
    import LoginModal from './modals/LoginModal.vue'
    import DeployModal from './modals/DeployModal.vue'
    import CartModal from "./modals/CartModal.vue";
    import TokenModal from "./modals/TokenModal.vue";

    export default {
        components: {CartModal, LoginModal, DeployModal, TokenModal },
        data() {
            return {}
        }
    }
</script>
<template>
    <LoginModal />
    <DeployModal />
    <CartModal />
    <TokenModal />
</template>