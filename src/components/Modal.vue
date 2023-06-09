<script>
    import LoginModal from './modals/LoginModal.vue'
    import DeployModal from './modals/DeployModal.vue'
    import CartModal from "./modals/CartModal.vue";
    import TokenModal from "./modals/TokenModal.vue";
    import TopupModal from "./modals/TopupModal.vue";
    import DepositModal from "./modals/DepositModal.vue";

    export default {
        components: {DepositModal, TopupModal, CartModal, LoginModal, DeployModal, TokenModal },
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
    <DepositModal />
    <TopupModal />
</template>