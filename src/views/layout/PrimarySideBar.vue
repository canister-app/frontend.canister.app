<script setup>
    import {walletData} from "@/services/store"
    import {WalletManager} from "../../services/WalletManager";
    function btnLogout(){
        WalletManager.logout();
    }
    function btnLogin(){
        WalletManager.btnLogin();
    }
</script>
<template>
    <div class="nk-apps-sidebar">
        <div class="nk-apps-brand">
            <router-link to="/" class="logo-link">
                <img class="logo-light logo-img" src="/images/logo-small.png" srcset="/images/logo-small2x.png 2x" alt="logo">
                <img class="logo-dark logo-img" src="/images/logo-dark-small.png" srcset="/images/logo-dark-small2x.png 2x" alt="logo-dark">
            </router-link>
        </div>
        <div class="nk-sidebar-element">
            <div class="nk-sidebar-body">
                <div class="nk-sidebar-content" data-simplebar>
                    <div class="nk-sidebar-menu">
                        <!-- Menu -->
                        <ul class="nk-menu apps-menu">
                            <li class="nk-menu-item">
                                <router-link to="/" class="nk-menu-link" title="Dashboard">
                                    <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                                </router-link>
                            </li><!-- .nk-menu-item -->
                            <li class="nk-menu-hr"></li>
                            <li class="nk-menu-item">
                                <router-link to="/store" class="nk-menu-link" title="Canister Store">
                                    <span class="nk-menu-icon"><em class="icon ni ni-layers"></em></span>
                                </router-link>
                            </li>
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/index-sales.html" class="nk-menu-link" title="Sales Dashboard">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-speed"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/index-crypto.html" class="nk-menu-link" title="Crypto Dashboard">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-bitcoin-cash"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/index-invest.html" class="nk-menu-link" title="Invest Dashboard">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-invest"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-hr"></li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/apps/mailbox.html" class="nk-menu-link" title="Mailbox">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-inbox"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/apps/messages.html" class="nk-menu-link" title="Messages">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-chat"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/apps/file-manager.html" class="nk-menu-link" title="File Manager">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-folder"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/apps/chats.html" class="nk-menu-link" title="Chats">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-chat-circle"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/apps/calendar.html" class="nk-menu-link" title="Calendar">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-calendar"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/apps/kanban.html" class="nk-menu-link">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-template"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="nk-menu-hr"></li>-->
<!--                            <li class="nk-menu-item">-->
<!--                                <a href="html/components.html" class="nk-menu-link" title="Go to Components">-->
<!--                                    <span class="nk-menu-icon"><em class="icon ni ni-layers"></em></span>-->
<!--                                </a>-->
<!--                            </li>-->
                        </ul>
                    </div>
                    <div class="nk-sidebar-footer">
                        <ul class="nk-menu nk-menu-md">
                            <li class="nk-menu-item">
                                <router-link to="/wallet" class="nk-menu-link" title="Wallet">
                                    <span class="nk-menu-icon"><em class="icon ni ni-wallet"></em></span>
                                </router-link>
                            </li>
                            <li class="nk-menu-item">
                                <a href="#" class="nk-menu-link" title="Settings">
                                    <span class="nk-menu-icon"><em class="icon ni ni-setting"></em></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="nk-sidebar-profile nk-sidebar-profile-fixed dropdown">
                    <a href="#" class="toggle" data-target="profileDD">
                        <div class="user-avatar">
                            <img :src="`/partner/${walletData.isLogged}.png`" :alt="walletData.isLogged" v-if="walletData.isLogged">
                            <em class="icon ni ni-wallet" @click="btnLogin" v-if="!walletData.isLogged"></em>
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-md m-1 nk-sidebar-profile-dropdown" data-content="profileDD" v-if="walletData.isLogged">
                        <div class="dropdown-inner user-card-wrap d-none d-md-block">
                            <div class="user-card">
                                <div class="user-avatar">
                                    <img :src="`/partner/${walletData.isLogged}.png`" :alt="walletData.isLogged">
                                </div>
                                <div class="user-info">
                                    <span class="lead-text">{{walletData.account.name}}</span>
                                    <span class="sub-text text-soft">{{walletData.txtPrincipal.slice(0,10)+'...'+walletData.txtPrincipal.slice(-10)}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-inner">
                            <ul class="link-list">
                                <li><a href="/profile"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                <li><a href="/account-setting"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                <li><a href="/login-activity"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                            </ul>
                        </div>
                        <div class="dropdown-inner">
                            <ul class="link-list">
                                <li><a href="javascript:void(0)" @click="btnLogout()"><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>