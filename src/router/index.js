import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreView from '../views/StoreView.vue'
import StoreDetailView from '../views/StoreDetailView.vue'
import PublisherDashboard from "../views/PublisherDashboard.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/store',
      name: 'store',
      component: StoreView
    },
    {
      path: '/publisher-dashboard',
      name: 'publisher-dashboard',
      component: PublisherDashboard
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
    }
  ]
})

export default router
