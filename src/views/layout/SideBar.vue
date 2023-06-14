<template>
    <div class="nk-sidebar" data-content="sidebarMenu">
        <div class="nk-sidebar-inner" data-simplebar>
            <ul class="nk-menu nk-menu-md">
                <li class="nk-menu-heading">
                    <h6 class="overline-title text-primary-alt">Dashboard</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item has-sub">
                    <router-link to="/" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                        <span class="nk-menu-text">Dashboard</span>
                    </router-link>
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-heading pt-4">
                    <h6 class="overline-title text-primary-alt">Canister Store</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item has-sub">
                    <router-link to="/store" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-layers"></em></span>
                        <span class="nk-menu-text">Canister Store</span>
                    </router-link>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <router-link to="/store?sort=deploy" class="nk-menu-link"><span class="nk-menu-text">Top Deploy</span></router-link>
                        </li>
                        <li class="nk-menu-item">
                            <router-link to="/store?sort=paid" class="nk-menu-link"><span class="nk-menu-text">Top Paid</span></router-link>
                        </li>
                        <li class="nk-menu-item">
                            <router-link to="/store?sort=free" class="nk-menu-link"><span class="nk-menu-text">Top Free</span></router-link>
                        </li>
                    </ul><!-- .nk-menu-sub -->
                </li><!-- .nk-menu-item -->


                <li class="nk-menu-item">
                    <router-link to="/publisher-dashboard" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                        <span class="nk-menu-text">Developer Dashboard</span>
                    </router-link>
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-heading pt-4">
                    <h6 class="overline-title text-primary-alt">My Canister</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item">
                    <router-link to="/my-canister" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-box"></em></span>
                        <span class="nk-menu-text">My canister</span>
                    </router-link>
                </li><!-- .nk-menu-item -->

<!--                <li class="nk-menu-item has-sub">-->
<!--                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                        <span class="nk-menu-icon"><em class="icon ni ni-user-list"></em></span>-->
<!--                        <span class="nk-menu-text">My Teams</span><span class="nk-menu-badge">New</span>-->
<!--                    </a>-->
<!--                    <ul class="nk-menu-sub">-->
<!--                        <li class="nk-menu-item">-->
<!--                            <a href="html/customer-list.html" class="nk-menu-link"><span class="nk-menu-text">Customer List</span></a>-->
<!--                        </li>-->
<!--                        <li class="nk-menu-item">-->
<!--                            <a href="html/customer-details.html" class="nk-menu-link"><span class="nk-menu-text">Customer Details</span></a>-->
<!--                        </li>-->
<!--                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                <li class="nk-menu-item">-->
<!--                    <a href="#" class="nk-menu-link">-->
<!--                        <span class="nk-menu-icon"><em class="icon ni ni-file-docs"></em></span>-->
<!--                        <span class="nk-menu-text">AML / KYCs</span>-->
<!--                    </a>-->
<!--                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
                <li class="nk-menu-item has-sub">
                    <a href="javascript:void(0)" class="nk-menu-link ">
                        <span class="nk-menu-icon"><em class="icon ni ni-link"></em></span>
                        <span class="nk-menu-text">Link canister</span>
                    </a>

                </li><!-- .nk-menu-item -->

                <li class="nk-menu-heading pt-4">
                    <h6 class="overline-title text-primary-alt">NFT Marketplace</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item ">
                    <router-link to="/marketplace" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-cart"></em></span>
                        <span class="nk-menu-text">Marketplace</span>
                    </router-link>
                    <ul class="nk-menu-sub">
                        <li class="nk-menu-item">
                            <router-link to="/marketplace?sort=deploy" class="nk-menu-link"><span class="nk-menu-text">Top Collection</span></router-link>
                        </li>
                        <li class="nk-menu-item">
                            <router-link to="/marketplace?sort=paid" class="nk-menu-link"><span class="nk-menu-text">New Collection</span></router-link>
                        </li>
                    </ul><!-- .nk-menu-sub -->

                </li><!-- .nk-menu-item -->


                <li class="nk-menu-heading pt-3">
                    <h6 class="overline-title text-primary-alt">Launchpad</h6>
                </li><!-- .nk-menu-heading -->
                <li class="nk-menu-item">
                    <a href="javascript:void(0)" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-cc-new"></em></span>
                        <span class="nk-menu-text">New Project</span>
                    </a>
                </li><!-- .nk-menu-item -->


                <li class="nk-menu-item ">
                    <a href="javascript:void(0)" class="nk-menu-link ">
                        <span class="nk-menu-icon"><em class="icon ni ni-activity"></em></span>
                        <span class="nk-menu-text">Upcoming</span>
                    </a>
                </li><!-- .nk-menu-item -->  <li class="nk-menu-item ">
                    <a href="javascript:void(0)" class="nk-menu-link ">
                        <span class="nk-menu-icon"><em class="icon ni ni-activity-round"></em></span>
                        <span class="nk-menu-text">Live Projects</span>
                    </a>
                </li><!-- .nk-menu-item -->
                <li class="nk-menu-item">
                    <a href="javascript:void(0)" class="nk-menu-link">
                        <span class="nk-menu-icon"><em class="icon ni ni-check-circle"></em></span>
                        <span class="nk-menu-text">Finished Projects</span>
                    </a>
                </li><!-- .nk-menu-item -->

            </ul><!-- .nk-menu -->
        </div>
    </div>
</template>