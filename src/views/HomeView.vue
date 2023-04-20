<script >
  import SideBar from '../components/SideBar.vue'
  import Files from '../components/Files.vue'
  import { ref } from "vue";
  export default {
    components: { Files },
    data(){
      return {
      }
    }
  }
</script>

<template>
  <div class="nk-content nk-content-fluid">
    <div class="container-xl wide-xl">
      <div class="nk-content-inner">
        <div class="nk-content-body">
          <div class="nk-fmg">
<!--            <SideBar />-->
            <Files />
          </div><!-- .nk-fmg -->
        </div>
      </div>
    </div>
  </div>
</template>
