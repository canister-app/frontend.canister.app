<template>
    <div class="nk-sidebar" data-content="sidebarMenu">
        <div class="nk-sidebar-inner" data-simplebar>
            <ul class="nk-menu nk-menu-md">
                <li class="nk-menu-heading">
                    <h6 class="overline-title text-primary-alt">Canister Store</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item has-sub">
                    <router-link to="/store" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-layers"></em></span>
                        <span class="nk-menu-text">Canister Store</span>
                    </router-link>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <a href="/store?sort=deploy" class="nk-menu-link"><span class="nk-menu-text">Top Deploy</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="/store?sort=paid" class="nk-menu-link"><span class="nk-menu-text">Top Paid</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="/store?sort=free" class="nk-menu-link"><span class="nk-menu-text">Top Free</span></a>
                        </li>
                    </ul><!-- .nk-menu-sub -->
                </li><!-- .nk-menu-item -->


                <li class="nk-menu-item">
                    <router-link to="/publisher-dashboard" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                        <span class="nk-menu-text">Publisher Dashboard</span>
                    </router-link>
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-heading">
                    <h6 class="overline-title text-primary-alt">Canister</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item">
                    <router-link to="/my-canister" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-box"></em></span>
                        <span class="nk-menu-text">My canister</span>
                    </router-link>
                </li><!-- .nk-menu-item -->

                <li class="nk-menu-item has-sub">
                    <a href="#" class="nk-menu-link nk-menu-toggle">
                        <span class="nk-menu-icon"><em class="icon ni ni-user-list"></em></span>
                        <span class="nk-menu-text">My Teams</span><span class="nk-menu-badge">New</span>
                    </a>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <a href="html/customer-list.html" class="nk-menu-link"><span class="nk-menu-text">Customer List</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/customer-details.html" class="nk-menu-link"><span class="nk-menu-text">Customer Details</span></a>
                        </li>
                    </ul><!-- .nk-menu-sub -->
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-item">
                    <a href="#" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-file-docs"></em></span>
                        <span class="nk-menu-text">AML / KYCs</span>
                    </a>
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-item has-sub">
                    <a href="#" class="nk-menu-link nk-menu-toggle">
                        <span class="nk-menu-icon"><em class="icon ni ni-tranx"></em></span>
                        <span class="nk-menu-text">Transactions</span>
                    </a>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <a href="html/transaction-basic.html" class="nk-menu-link"><span class="nk-menu-text">Tranx List - Basic</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/transaction-crypto.html" class="nk-menu-link"><span class="nk-menu-text">Tranx List - Crypto</span></a>
                        </li>
                    </ul><!-- .nk-menu-sub -->
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-item">
                    <a href="#" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-file-docs"></em></span>
                        <span class="nk-menu-text">My Invoice</span>
                    </a>
                </li><!-- .nk-menu-item -->

                <li class="nk-menu-heading">
                    <h6 class="overline-title text-primary-alt">NFT Marketplace</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item has-sub">
                    <a href="#" class="nk-menu-link nk-menu-toggle">
                        <span class="nk-menu-icon"><em class="icon ni ni-signin"></em></span>
                        <span class="nk-menu-text">Marketplace</span>
                    </a>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <a href="html/pages/auths/auth-login.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Login / Signin</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/pages/auths/auth-register.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Register / Signup</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/pages/auths/auth-reset.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Forgot Password</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/pages/auths/auth-success.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Success / Confirm</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="#" class="nk-menu-link nk-menu-toggle"><span class="nk-menu-text">Classic Version - v2</span></a>
                            <ul class="nk-menu-sub">
                                <li class="nk-menu-item">
                                    <a href="html/pages/auths/auth-login-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Login / Signin</span></a>
                                </li>
                                <li class="nk-menu-item">
                                    <a href="html/pages/auths/auth-register-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Register / Signup</span></a>
                                </li>
                                <li class="nk-menu-item">
                                    <a href="html/pages/auths/auth-reset-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Forgot Password</span></a>
                                </li>
                                <li class="nk-menu-item">
                                    <a href="html/pages/auths/auth-success-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Success / Confirm</span></a>
                                </li>
                            </ul>
                        </li>

                    </ul><!-- .nk-menu-sub -->
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-item has-sub">
                    <a href="#" class="nk-menu-link nk-menu-toggle">
                        <span class="nk-menu-icon"><em class="icon ni ni-files"></em></span>
                        <span class="nk-menu-text">Error Pages</span>
                    </a>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <a href="html/pages/errors/404-classic.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">404 Classic</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/pages/errors/504-classic.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">504 Classic</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/pages/errors/404-s1.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">404 Modern</span></a>
                        </li>
                        <li class="nk-menu-item">
                            <a href="html/pages/errors/504-s1.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">504 Modern</span></a>
                        </li>
                    </ul><!-- .nk-menu-sub -->
                </li><!-- .nk-menu-item -->

                <li class="nk-menu-heading">
                    <h6 class="overline-title text-primary-alt">Launchpad</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item">
                    <a href="#" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-cc-new"></em></span>
                        <span class="nk-menu-text">New Project</span>
                    </a>
                </li><!-- .nk-menu-item -->


                <li class="nk-menu-item ">
                    <a href="#" class="nk-menu-link ">
                        <span class="nk-menu-icon"><em class="icon ni ni-activity"></em></span>
                        <span class="nk-menu-text">Upcoming</span>
                    </a>
                </li><!-- .nk-menu-item -->  <li class="nk-menu-item ">
                    <a href="#" class="nk-menu-link ">
                        <span class="nk-menu-icon"><em class="icon ni ni-activity-round"></em></span>
                        <span class="nk-menu-text">Live Projects</span>
                    </a>
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-item">
                    <a href="#" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-check-circle"></em></span>
                        <span class="nk-menu-text">Finished Projects</span>
                    </a>
                </li><!-- .nk-menu-item -->

            </ul><!-- .nk-menu -->
        </div>
    </div>
</template>