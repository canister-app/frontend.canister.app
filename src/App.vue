<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HeaderView from './views/layout/HeaderView.vue'
  import FooterView from './views/layout/FooterView.vue'

</script>

<template>
  <div class="nk-app-root">
    <div class="nk-wrap">
      <HeaderView />
        <RouterView />
      <FooterView />
    </div>
  </div>
</template>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  @media only screen and (max-width : 480px) {
    .vue-modal-content {
      min-width: 99% !important;
    }
  }
  .vue-modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vue-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    min-width: 600px;
    max-height: 450px;
  }
  .modal__title {
    margin: 0 2rem 0 0;
    font-weight: 700;
  }
  .modal__content{
    flex-grow: 1;
    overflow-y: auto;
    margin-top: 1.25em;
    margin-bottom: 1.25em;

  }
  .modal__close {
    position: absolute;
    top: 0.5rem;
    border: none;
    background: none;
    right: 0.5rem;
  }
  .nk-fmg{
    height:100vh;
  }
</style>
