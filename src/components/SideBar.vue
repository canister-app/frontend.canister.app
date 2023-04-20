<script>
    import { VueFinalModal } from 'vue-final-modal'
    export default {
        components: { VueFinalModal },
        data() {
            showModalSetting: false;
        },
        methods: {
            btnShowSetting() {
                console.log('show setting')
                this.showModalSetting = true;
            },
        }
    }
</script>
<template>
    <div class="nk-fmg-aside" data-content="files-aside" data-toggle-overlay="true" data-toggle-body="true" data-toggle-screen="lg" data-simplebar>
        <div class="nk-fmg-aside-wrap">
            <div class="nk-fmg-aside-top" data-simplebar>
                <ul class="nk-fmg-menu">
                    <li class="active">
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-home-alt"></em>
                            <span class="nk-fmg-menu-text">Home</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-file-docs"></em>
                            <span class="nk-fmg-menu-text">Files</span>
                        </a>
                        <ul>
                            <li><a href="#" class="nk-fmg-menu-item"><span class="nk-fmg-menu-text">New Files</span></a></li>
                            <li><a href="#" class="nk-fmg-menu-item"><span class="nk-fmg-menu-text">This Months</span></a></li>
                            <li><a href="#" class="nk-fmg-menu-item"><span class="nk-fmg-menu-text">Older Files</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-star"></em>
                            <span class="nk-fmg-menu-text">Starred</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-share-alt"></em>
                            <span class="nk-fmg-menu-text">Shared</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-trash-alt"></em>
                            <span class="nk-fmg-menu-text">Recovery</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="javascript:void(0)" @click="btnShowSetting">
                            <em class="icon ni ni-setting-alt"></em>
                            <span class="nk-fmg-menu-text">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="nk-fmg-aside-bottom">
                <div class="nk-fmg-status">
                    <h6 class="nk-fmg-status-title"><em class="icon ni ni-hard-drive"></em><span>Storage</span></h6>
                    <div class="progress progress-md bg-light">
                        <div class="progress-bar" data-progress="5"></div>
                    </div>
                    <div class="nk-fmg-status-info">12.47 GB of 50 GB used</div>
                    <div class="nk-fmg-status-action">
                        <a href="#" class="link link-primary link-sm">Upgrade Storage</a>
                    </div>
                </div>
                <div class="nk-fmg-switch">
                    <div class="dropup">
                        <a href="#" data-bs-toggle="dropdown" data-offset="-10, 12" class="dropdown-toggle dropdown-indicator-unfold">
                            <div class="lead-text">Personal</div>
                            <div class="sub-text">Only you</div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <ul class="link-list-opt no-bdr">
                                <li><a href="#"><span>Team Plan</span></a></li>
                                <li><a class="active" href="#"><span>Personal</span></a></li>
                                <li class="divider"></li>
                                <li><a class="link" href="#"><span>Upgrade Plan</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- .nk-fmg-aside -->


</template>
