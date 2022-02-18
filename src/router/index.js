import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search/index.vue')
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import('../views/Editor/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
