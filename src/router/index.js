import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Typ from '../components/Main'
import Axios from '../components/Axios'
import Typmode from '../components/typmode/Typmode'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/typ',
    name: 'Typ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Typ
  },
  {
    path: '/axios',
    name: 'Axios',
    component: Axios
  },
  {
    path: '/typmode',
    name: 'Typmode',
    component: Typmode
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
