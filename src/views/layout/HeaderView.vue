<script setup>
    import { walletData } from "@/services/store";
    import {StoicIdentity} from "ic-stoic-identity";
    import router from "../../router";
    import {principalToAccountIdentifier, formatICP, rosettaApi} from "../../IC/utils";
    import EventBus from "../../services/EventBus";
    function btnLogin() {
        walletData.setModalVisible(true);
    }
    function btnShowSetting(){
        console.log('ok emit');
        EventBus.emit("showModalSetting", true);
    }
    function btnLogout(){
        window.Swal.fire({
            icon: 'question',
            text: 'Are you sure you want to logout?',
            showCancelButton: true,
            confirmButtonText: 'Yes, Log me out!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("_w_connected");
                localStorage.removeItem("_account_index");
                StoicIdentity.disconnect();
                walletData.setIdentity(false);
                walletData.setAccount([]);
                walletData.setBalance(0);
                walletData.setLoginState(false);
                walletData.setCurrentAccount({});
                walletData.setCanicLockedBalance(0);
                walletData.logoutAction();
                router.push({ path: '/' });
            }
        })
    }
</script>
<template>
    <div class="nk-header nk-header-fluid is-theme">
        <div class="container-xl wide-xl">
            <div class="nk-header-wrap">
                <div class="nk-menu-trigger me-sm-2 d-lg-none">
                    <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-menu"></em></a>
                </div>
                <div class="nk-header-brand">
                    <router-link to="/" class="logo-link">
                        <img class="logo-light logo-img" src="/images/logo.png" srcset="/images/logo.png 2x" alt="logo">
                        <img class="logo-dark logo-img" src="/images/logo-dark2x.png" srcset="/images/logo-dark2x.png 2x" alt="logo-dark">
                    </router-link>
                </div><!-- .nk-header-brand -->
                <div class="nk-header-menu" data-content="headerNav">
                    <div class="nk-header-mobile">
                        <div class="nk-header-brand">
                            <router-link to="/" class="logo-link">
                                <img class="logo-light logo-img" src="/images/logo.png" srcset="/images/logo.png 2x" alt="logo">
                                <img class="logo-dark logo-img" src="/images/logo-dark2x.png" srcset="/images/logo-dark2x.png 2x" alt="logo-dark">
                            </router-link>
                        </div>
                        <div class="nk-menu-trigger me-n2">
                            <a href="javascript:void(0)" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-arrow-left"></em></a>
                        </div>
                    </div>
                    <ul class="nk-menu nk-menu-main ui-s2">
                        <li class="nk-menu-item has-sub">
                            <a href="#" class="nk-menu-link nk-menu-toggle">
                                <span class="nk-menu-text">Home</span>
                            </a>
<!--                            <ul class="nk-menu-sub">-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="/" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">My files</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->

<!--                            </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
                        </li><!-- .nk-menu-item -->
                        <li class="nk-menu-item">
                            <a class="nk-menu-link " href="javascript:void(0)" @click="btnShowSetting">
                                <span class="nk-menu-text"><em class="icon ni ni-setting-alt"></em> Settings</span>
                            </a>
                        </li><!-- .nk-menu-item -->

                    </ul><!-- .nk-menu -->
<!--                    <div class="nk-fmg-status">-->
<!--                        <h6 class="nk-fmg-status-title"><em class="icon ni ni-hard-drive"></em><span>Canister Storage</span></h6>-->
<!--                        <div class="progress progress-md bg-light">-->
<!--                            <div class="progress-bar" data-progress="5"></div>-->
<!--                        </div>-->
<!--                        <div class="nk-fmg-status-info">0.47 GB of 4 GB used</div>-->
<!--                        <div class="nk-fmg-status-action">-->
<!--                            <a href="#" class="link link-primary link-sm">Create New Bucket</a>-->
<!--                        </div>-->
<!--                    </div>-->
                </div><!-- .nk-header-menu -->
                <div class="nk-header-tools">
                    <ul class="nk-quick-nav">
                        <li v-if="!walletData.isLogged">
                            <a href="javascript:void(0)" @click="btnLogin()" class="btn btn-wider btn-primary"><span>Login</span><em class="icon ni ni-arrow-right"></em></a>
                        </li>
                        <li class="dropdown user-dropdown order-sm-first" v-if="walletData.principal">
                            <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                <div class="user-toggle">
                                    <div class="user-avatar sm">
                                        <em class="icon ni ni-user-alt"></em>
                                    </div>
                                    <div class="user-info d-xl-block">
                                        <div class="user-status">Welcome</div>
                                        <div class="user-name dropdown-indicator">
                                            {{walletData.txtPrincipal.slice(0,10)+'...'+walletData.txtPrincipal.slice(-10)}}
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1 is-light">
                                <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                    <div class="user-card">
                                        <div class="user-avatar">
                                            <span>NL</span>
                                        </div>
                                        <div class="user-info">
                                            <span class="lead-text">{{walletData.account.name}}</span>
                                            <span class="sub-text">{{walletData.txtPrincipal.slice(0,10)+'...'+walletData.txtPrincipal.slice(-10)}}</span>
                                        </div>
                                        <div class="user-action">
                                            <a class="btn btn-icon me-n2" href="#"><em class="icon ni ni-setting"></em></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-inner user-account-info">
                                    <h6 class="overline-title-alt">Account Balance</h6>
                                    <div class="user-balance">{{walletData.balance}} <small class="currency currency-usd">ICP</small></div>
                                    <div class="user-balance">0 <small class="currency currency-usd">XCANIC</small></div>
                                    <div class="user-balance-sub">Locked <span>0 <span class="currency currency-usd">XCANIC</span></span></div>
                                    <a href="#" class="link"><span>Withdraw Balance</span> <em class="icon ni ni-wallet-out"></em></a>
                                </div>
<!--                                <div class="dropdown-inner">-->
<!--                                    <ul class="link-list">-->
<!--                                        <li><a href="html/user-profile-regular.html"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>-->
<!--                                        <li><a href="html/user-profile-setting.html"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>-->
<!--                                        <li><a href="html/user-profile-activity.html"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>-->
<!--                                        <li><a class="dark-mode-switch" href="#"><em class="icon ni ni-moon"></em><span>Dark Mode</span></a></li>-->
<!--                                    </ul>-->
<!--                                </div>-->
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li><a href="javascript:void(0)" @click="btnLogout()"><em class="icon ni ni-signout"></em><span>Logout</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li><!-- .dropdown -->
<!--                        <li class="dropdown notification-dropdown">-->
<!--                            <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">-->
<!--                                <div class="icon-status icon-status-info"><em class="icon ni ni-bell"></em></div>-->
<!--                            </a>-->
<!--                            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end dropdown-menu-s1">-->
<!--                                <div class="dropdown-head">-->
<!--                                    <span class="sub-title nk-dropdown-title">Notifications</span>-->
<!--                                    <a href="#">Mark All as Read</a>-->
<!--                                </div>-->
<!--                                <div class="dropdown-body">-->
<!--                                    <div class="nk-notification">-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="nk-notification-item dropdown-inner">-->
<!--                                            <div class="nk-notification-icon">-->
<!--                                                <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>-->
<!--                                            </div>-->
<!--                                            <div class="nk-notification-content">-->
<!--                                                <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>-->
<!--                                                <div class="nk-notification-time">2 hrs ago</div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>&lt;!&ndash; .nk-notification &ndash;&gt;-->
<!--                                </div>&lt;!&ndash; .nk-dropdown-body &ndash;&gt;-->
<!--                                <div class="dropdown-foot center">-->
<!--                                    <a href="#">View All</a>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </li>&lt;!&ndash; .dropdown &ndash;&gt;-->

                    </ul><!-- .nk-quick-nav -->
                </div><!-- .nk-header-tools -->
            </div><!-- .nk-header-wrap -->
        </div><!-- .container-fliud -->
    </div>
    <!-- main header @e -->
</template>