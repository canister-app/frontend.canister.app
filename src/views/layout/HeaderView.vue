<template>
    <div class="nk-header nk-header-fluid is-theme">
        <div class="container-xl wide-xl">
            <div class="nk-header-wrap">
                <div class="nk-menu-trigger me-sm-2 d-lg-none">
                    <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-menu"></em></a>
                </div>
                <div class="nk-header-brand">
                    <router-link to="/" class="logo-link">
                        <img class="logo-light logo-img" src="/images/logo.png" srcset="/images/logo2x.png 2x" alt="logo">
                        <img class="logo-dark logo-img" src="/images/logo-dark.png" srcset="/images/logo-dark2x.png 2x" alt="logo-dark">
                    </router-link>
                </div><!-- .nk-header-brand -->
                <div class="nk-header-menu" data-content="headerNav">
                    <div class="nk-header-mobile">
                        <div class="nk-header-brand">
                            <router-link to="/" class="logo-link">
                                <img class="logo-light logo-img" src="/images/logo.png" srcset="/images/logo2x.png 2x" alt="logo">
                                <img class="logo-dark logo-img" src="/images/logo-dark.png" srcset="/images/logo-dark2x.png 2x" alt="logo-dark">
                            </router-link>
                        </div>
                        <div class="nk-menu-trigger me-n2">
                            <a href="javascript:void(0)" class="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em class="icon ni ni-arrow-left"></em></a>
                        </div>
                    </div>
<!--                    <ul class="nk-menu nk-menu-main ui-s2">-->
<!--                        <li class="nk-menu-item has-sub">-->
<!--                            <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                <span class="nk-menu-text">Dashboards</span>-->
<!--                            </a>-->
<!--                            <ul class="nk-menu-sub">-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/index.html" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">Default Dashboard</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/index-sales.html" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">Sales Dashboard</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/index-crypto.html" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">Crypto Dashboard</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/index-analytics.html" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">Analytics Dashboard</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-heading">-->
<!--                                    <h6 class="overline-title text-primary">Use-Case Concept</h6>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/invest/index.html" class="nk-menu-link" target="_blank">-->
<!--                                        <span class="nk-menu-text">Investment Panel</span>-->
<!--                                        <span class="nk-menu-badge">HOT</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                            </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                        </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                        <li class="nk-menu-item has-sub">-->
<!--                            <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                <span class="nk-menu-text">Applications</span>-->
<!--                            </a>-->
<!--                            <ul class="nk-menu-sub">-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/apps-messages.html" class="nk-menu-link"><span class="nk-menu-text">Messages</span></a>-->
<!--                                </li>-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/apps-inbox.html" class="nk-menu-link"><span class="nk-menu-text">Inbox / Mail</span></a>-->
<!--                                </li>-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/apps-file-manager.html" class="nk-menu-link"><span class="nk-menu-text">File Manager</span></a>-->
<!--                                </li>-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/apps-chats.html" class="nk-menu-link"><span class="nk-menu-text">Chats / Messenger</span></a>-->
<!--                                </li>-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/apps-calendar.html" class="nk-menu-link"><span class="nk-menu-text">Calendar</span></a>-->
<!--                                </li>-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/apps-kanban.html" class="nk-menu-link"><span class="nk-menu-text">Kanban Board</span></a>-->
<!--                                </li>-->
<!--                            </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                        </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                        <li class="nk-menu-item has-sub">-->
<!--                            <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                <span class="nk-menu-text">Pages</span>-->
<!--                            </a>-->
<!--                            <ul class="nk-menu-sub">-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">Projects</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/project-card.html" class="nk-menu-link"><span class="nk-menu-text">Project Cards</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/project-list.html" class="nk-menu-link"><span class="nk-menu-text">Project List</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">User Manage</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/user-list-regular.html" class="nk-menu-link"><span class="nk-menu-text">User List - Regular</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/user-list-compact.html" class="nk-menu-link"><span class="nk-menu-text">User List - Compact</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/user-details-regular.html" class="nk-menu-link"><span class="nk-menu-text">User Details - Regular</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/user-profile-regular.html" class="nk-menu-link"><span class="nk-menu-text">User Profile - Regular</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/user-card.html" class="nk-menu-link"><span class="nk-menu-text">User Contact - Card</span> </a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-icon"><em class="icon ni ni-user-list"></em></span>-->
<!--                                        <span class="nk-menu-text">Customers</span><span class="nk-menu-badge">New</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/customer-list.html" class="nk-menu-link"><span class="nk-menu-text">Customer List</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/customer-details.html" class="nk-menu-link"><span class="nk-menu-text">Customer Details</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">AML / KYCs</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/kyc-list-regular.html" class="nk-menu-link"><span class="nk-menu-text">KYC List - Regular</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/kyc-details-regular.html" class="nk-menu-link"><span class="nk-menu-text">KYC Details - Regular</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">Transactions</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/transaction-basic.html" class="nk-menu-link"><span class="nk-menu-text">Tranx List - Basic</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/transaction-crypto.html" class="nk-menu-link"><span class="nk-menu-text">Tranx List - Crypto</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">Invoice</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/invoice-list.html" class="nk-menu-link"><span class="nk-menu-text">Invoice List</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/invoice-details.html" class="nk-menu-link"><span class="nk-menu-text">Invoice Details</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">Products</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/product-list.html" class="nk-menu-link"><span class="nk-menu-text">Product List</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/product-card.html" class="nk-menu-link"><span class="nk-menu-text">Product Card</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/product-details.html" class="nk-menu-link"><span class="nk-menu-text">Product Details</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/pricing-table.html" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">Pricing Table</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/gallery.html" class="nk-menu-link">-->
<!--                                        <span class="nk-menu-text">Image Gallery</span>-->
<!--                                    </a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/pages/regular-v1.html" class="nk-menu-link"><span class="nk-menu-text">Regular Page - v1</span></a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/pages/regular-v2.html" class="nk-menu-link"><span class="nk-menu-text">Regular Page - v2</span></a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/pages/faqs.html" class="nk-menu-link"><span class="nk-menu-text">Faqs / Help</span></a>-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                            </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                        </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                        <li class="nk-menu-item has-sub">-->
<!--                            <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                <span class="nk-menu-text">Misc</span>-->
<!--                            </a>-->
<!--                            <ul class="nk-menu-sub">-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">Auth Pages</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/auths/auth-login.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Login / Signin</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/auths/auth-register.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Register / Signup</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/auths/auth-reset.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Forgot Password</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/auths/auth-success.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Success / Confirm</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item has-sub">-->
<!--                                            <a href="#" class="nk-menu-link nk-menu-toggle"><span class="nk-menu-text">Classic Version - v2</span></a>-->
<!--                                            <ul class="nk-menu-sub">-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-login-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Login / Signin</span></a>-->
<!--                                                </li>-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-register-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Register / Signup</span></a>-->
<!--                                                </li>-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-reset-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Forgot Password</span></a>-->
<!--                                                </li>-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-success-v2.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Success / Confirm</span></a>-->
<!--                                                </li>-->
<!--                                            </ul>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item has-sub">-->
<!--                                            <a href="#" class="nk-menu-link nk-menu-toggle"><span class="nk-menu-text">No Slider Version - v3</span></a>-->
<!--                                            <ul class="nk-menu-sub">-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-login-v3.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Login / Signin</span></a>-->
<!--                                                </li>-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-register-v3.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Register / Signup</span></a>-->
<!--                                                </li>-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-reset-v3.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Forgot Password</span></a>-->
<!--                                                </li>-->
<!--                                                <li class="nk-menu-item">-->
<!--                                                    <a href="html/pages/auths/auth-success-v3.html" class="nk-menu-link" target="_blank"><span class="nk-menu-text">Success / Confirm</span></a>-->
<!--                                                </li>-->
<!--                                            </ul>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item has-sub">-->
<!--                                    <a href="#" class="nk-menu-link nk-menu-toggle">-->
<!--                                        <span class="nk-menu-text">Error Pages</span>-->
<!--                                    </a>-->
<!--                                    <ul class="nk-menu-sub">-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/errors/404-classic.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">404 Classic</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/errors/504-classic.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">504 Classic</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/errors/404-s1.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">404 Modern</span></a>-->
<!--                                        </li>-->
<!--                                        <li class="nk-menu-item">-->
<!--                                            <a href="html/pages/errors/504-s1.html" target="_blank" class="nk-menu-link"><span class="nk-menu-text">504 Modern</span></a>-->
<!--                                        </li>-->
<!--                                    </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                                </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/_blank.html" class="nk-menu-link"><span class="nk-menu-text">Blank / Startup</span></a>-->
<!--                                </li>-->
<!--                                <li class="nk-menu-item">-->
<!--                                    <a href="html/pages/terms-policy.html" class="nk-menu-link"><span class="nk-menu-text">Terms / Policy</span></a>-->
<!--                                </li>-->
<!--                            </ul>&lt;!&ndash; .nk-menu-sub &ndash;&gt;-->
<!--                        </li>&lt;!&ndash; .nk-menu-item &ndash;&gt;-->
<!--                    </ul>&lt;!&ndash; .nk-menu &ndash;&gt;-->
                </div><!-- .nk-header-menu -->
                <div class="nk-header-tools">
                    <ul class="nk-quick-nav">
                        <li class="dropdown user-dropdown order-sm-first">
                            <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                <div class="user-toggle">
                                    <div class="user-avatar sm">
                                        <em class="icon ni ni-user-alt"></em>
                                    </div>
                                    <div class="user-info d-none d-xl-block">
                                        <div class="user-status">Welcome</div>
                                        <div class="user-name dropdown-indicator">2vxsx-fae</div>
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
                                            <span class="lead-text">Public Drive</span>
                                            <span class="sub-text">2vxsx-fae</span>
                                        </div>
                                        <div class="user-action">
                                            <a class="btn btn-icon me-n2" href="#"><em class="icon ni ni-setting"></em></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown-inner user-account-info">
                                    <h6 class="overline-title-alt">Account Balance</h6>
                                    <div class="user-balance">4.23 <small class="currency currency-usd">ICP</small></div>
                                    <div class="user-balance">38,290 <small class="currency currency-usd">XCANIC</small></div>
                                    <div class="user-balance-sub">Locked <span>10,000 <span class="currency currency-usd">XCANIC</span></span></div>
                                    <a href="#" class="link"><span>Withdraw Balance</span> <em class="icon ni ni-wallet-out"></em></a>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li><a href="html/user-profile-regular.html"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                        <li><a href="html/user-profile-setting.html"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                        <li><a href="html/user-profile-activity.html"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                        <li><a class="dark-mode-switch" href="#"><em class="icon ni ni-moon"></em><span>Dark Mode</span></a></li>
                                    </ul>
                                </div>
                                <div class="dropdown-inner">
                                    <ul class="link-list">
                                        <li><a href="#"><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
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