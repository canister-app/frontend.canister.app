import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreView from '../views/StoreView.vue'
import StoreDetailView from '../views/StoreDetailView.vue'
import PublisherDashboard from "../views/PublisherDashboard.vue";
import MyCanister from "../views/MyCanister.vue";
import MyCanisterDetail from "../views/MyCanisterDetail.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Wallet from "../views/Wallet.vue";
import Marketplace from "../views/Marketplace.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/store',
      name: 'store',
      component: StoreView
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: Marketplace
    },
    {
      path: '/publisher-dashboard',
      name: 'publisher-dashboard',
      component: PublisherDashboard
    },
    {
      path: '/my-canister',
      name: 'my-canister',
      component: MyCanister
    },
    {
      path: '/my-canister/:canister_id',
      name: 'my-canister-detail',
      component: MyCanisterDetail
    },
    {
      path: '/store/:id',
      name: 'store-detail',
      component: StoreDetailView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
  ]
})

export default router
