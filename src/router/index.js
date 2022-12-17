import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Typ from '../components/Main';
import Typmode from '../components/typmode/Typmode';
import Register from '../components/register/register';
import Login from '../components/login/Login.vue';
import logout from '../components/logout/Logout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/typ',
    name: 'Typ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Typ,
    props: true,
  },
  {
    path: '/typmode',
    name: 'Typmode',
    component: Typmode,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
