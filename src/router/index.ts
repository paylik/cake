import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/calc',
    name: 'calc',
    component: () => import('@/views/Calc.vue')
  },
  {
    path: '/*',
    name: 'e404',
    component: () => import('@/views/E404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
