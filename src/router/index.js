import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Login.vue')
   
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
