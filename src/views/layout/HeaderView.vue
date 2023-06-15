<script setup>
    import {walletData} from "../../services/store";
    import { shortPrincipal } from "@/IC/utils";
    import EventBus from "../../services/EventBus";
    import {WalletManager} from "../../services/WalletManager";
    function btnLogin() {
        WalletManager.btnLogin()
    }
    function btnShowSetting(){
        EventBus.emit("showModalSetting", true);
    }
    function btnShowLogin(){
        console.log('ok emit showLoginModal');
        EventBus.emit("showLoginModal", true);
    }
    function btnLogout(){
        WalletManager.logout();
    }
</script>
<template>
    <!-- main header @s -->
    <div class="nk-header nk-header-fixed is-light">
        <div class="container-fluid">
            <div class="nk-header-wrap">
                <div class="nk-menu-trigger d-xl-none ms-n1">
                    <a href="javascript:void(0)" class="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
                </div>
                <div class="nk-header-app-name">
                    <div class="nk-header-app-logo">
                        <img class="logo-img icon ni bg-blue-dim padding-5" src="/images/logo-small.png" srcset="/images/logo-small2x.png 2x" alt="logo">
<!--                        <em class="icon ni ni-dashlite bg-purple-dim"></em>-->
                    </div>
                    <div class="nk-header-app-info">
                        <span class="sub-text">Canister</span>
                        <span class="lead-text">Dashboard</span>
                    </div>
                </div>
                <div class="nk-header-menu is-light">
                    <div class="nk-header-menu-inner">
                        <!-- Menu -->
                        <ul class="nk-menu nk-menu-main">
                            <li class="nk-menu-item">
                                <router-link to="/store" class="nk-menu-link">
                                    <span class="nk-menu-text text-danger">Canister Store <em class="icon ni ni-hot"></em> </span>
                                </router-link>
                            </li>
                            <li class="nk-menu-item">
                                <router-link to="/marketplace" class="nk-menu-link">
                                    <span class="nk-menu-text">NFT Marketplace</span>
                                </router-link>
                            </li>
                            <li class="nk-menu-item">
                                <router-link to="/launchpad" class="nk-menu-link">
                                    <span class="nk-menu-text">Launchpad</span>
                                </router-link>
                            </li>

<!--                            <li class="nk-menu-item has-sub">-->
<!--                                <router-link to="/my-canister" class="nk-menu-link nk-menu-toggle">-->
<!--                                    <span class="nk-menu-text">My Canister</span>-->
<!--                                </router-link>-->
<!--                                <ul class="nk-menu-sub">-->
<!--                                    <li class="nk-menu-item">-->
<!--                                        <router-link to="/my-canister" class="nk-menu-link"><span class="nk-menu-text">My Canisters</span></router-link>-->
<!--                                    </li>-->
<!--                                    <li class="nk-menu-item">-->
<!--                                        <router-link to="/my-canister/link" class="nk-menu-link"><span class="nk-menu-text">Link Canister</span></router-link>-->
<!--                                    </li>-->

<!--                                </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                            </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
                            <li class="nk-menu-item">
                                <router-link to="/wallet" class="nk-menu-link">
                                    <span class="nk-menu-text"><em class="ni ni-wallet"></em> Wallet</span>
                                </router-link>
                            </li>
                        </ul>
                        <!-- Menu -->
                    </div>
                </div>
                <div class="nk-header-tools">
                    <ul class="nk-quick-nav">
                        <li class="">
                            <a href="javascript:void(0)" class="dark-switch-btn nk-quick-nav-icon">
                                <div class="icon-status icon-status-na"><em class="icon ni ni-moon"></em></div>
                            </a>
                        </li>
                        <li class="dropdown notification-dropdown" v-show="walletData.principal">
                            <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                <div class="icon-status icon-status-info"><em class="icon ni ni-bell"></em></div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                                <div class="dropdown-head">
                                    <span class="sub-title nk-dropdown-title">Notifications</span>
                                    <a href="#">Mark All as Read</a>
                                </div>
                                <div class="dropdown-body">
                                    <div class="nk-notification">
                                        <div class="nk-notification-item dropdown-inner">
                                            <div class="nk-notification-icon">
                                                <em class="icon icon-circle bg-primary-dim ni ni-share"></em>
                                            </div>
                                            <div class="nk-notification-content">
                                                <div class="nk-notification-text">Canister <span>ICRC1</span> created.</div>
                                                <div class="nk-notification-time">Just now</div>
                                            </div>
                                        </div>
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-info-dim ni ni-edit"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">Iliash <span>invited</span> you to edit <span>DashLite</span> folder</div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-primary-dim ni ni-share"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">You have shared <span>project v2</span> with Parvez.</div>-->
<!--                                                <div class="nk-notification-time">7 days ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-success-dim ni ni-spark"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">Your <span>Subscription</span> renew successfully.</div>-->
<!--                                                <div class="nk-notification-time">2 month ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div><!-- .nk-notification -->
                                </div><!-- .nk-dropdown-body -->
                                <div class="dropdown-foot center">
                                    <a href="#">View All</a>
                                </div>
                            </div>
                        </li>
                        <li class="dropdown list-apps-dropdown d-lg-none">
                            <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                <div class="icon-status icon-status-na"><em class="icon ni ni-menu-circled"></em></div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                                <div class="dropdown-body">
<!--                                    <ul class="list-apps">-->
<!--                                        <li>-->
<!--                                            <a href="html/index.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-dashlite bg-primary text-white"></em></span>-->
<!--                                                <span class="list-apps-title">Dashboard</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="html/apps/chats.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-chat-circle bg-info-dim"></em></span>-->
<!--                                                <span class="list-apps-title">Chats</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="html/apps/mailbox.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-inbox bg-purple-dim"></em></span>-->
<!--                                                <span class="list-apps-title">Mailbox</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="html/apps/messages.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-chat bg-success-dim"></em></span>-->
<!--                                                <span class="list-apps-title">Messages</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="html/apps/file-manager.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-folder bg-purple-dim"></em></span>-->
<!--                                                <span class="list-apps-title">File Manager</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="html/components.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-layers bg-secondary-dim"></em></span>-->
<!--                                                <span class="list-apps-title">Components</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                    </ul>-->
<!--                                    <ul class="list-apps">-->
<!--                                        <li>-->
<!--                                            <a href="/demo2/ecommerce/index.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-cart bg-danger-dim"></em></span>-->
<!--                                                <span class="list-apps-title">Ecommerce Panel</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="/demo4/subscription/index.html">-->
<!--                                                <span class="list-apps-media"><em class="icon ni ni-calendar-booking bg-primary-dim"></em></span>-->
<!--                                                <span class="list-apps-title">Subscription Panel</span>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                       -->
<!--                                    </ul>-->
                                </div><!-- .nk-dropdown-body -->
                            </div>
                        </li>
                        <li v-if="!walletData.isLogged">
                            <a href="javascript:void(0)" @click="btnLogin()" class="btn btn-wider btn-primary"><em class="icon ni ni-wallet"></em> <span>Wallet</span></a>
                        </li>

                        <li class="dropdown user-dropdown" v-show="walletData.principal">

                            <a href="#" class="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                                <div class="user-toggle">
                                    <div class="user-avatar sm">
                                        <img :src="`/partner/${walletData.isLogged}.png`" :alt="walletData.isLogged">
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-md dropdown-menu-end">
                                <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                    <div class="user-card">
                                        <div class="user-avatar">
                                            <img :src="`/partner/${walletData.isLogged}.png`" :alt="walletData.isLogged">
                                        </div>
                                        <div class="user-info">
                                            <span class="lead-text">{{walletData.account.name}}</span>
                                            <span class="sub-text"> {{shortPrincipal(walletData.txtPrincipal)}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li><router-link to="/wallet"><em class="icon ni ni-wallet"></em><span>My Wallet</span></router-link></li>
                                        <li><a href="/my-account-setting"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                        <li><a href="/my-profile-activity"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                        <li><a class="dark-switch-btn" href="javascript:void(0)"><em class="icon ni ni-moon"></em><span>Dark Mode</span></a></li>
                                    </ul>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li><a href="javascript:void(0)" @click="btnLogout()"><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- main header @e -->
</template>