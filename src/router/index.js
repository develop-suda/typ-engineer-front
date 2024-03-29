// @ts-nocheck
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Typ from '../components/Main';
import Typmode from '../components/typmode/Typmode';
import Register from '../components/register/register';
import Login from '../components/login/Login.vue';
import logout from '../components/logout/Logout.vue';
import WordList from '../components/wordlist/WordList.vue';
import MyPage from '../components/mypage/MyPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/typ',
    name: 'Typ',
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
  {
    path: '/wordlist',
    name: 'WordList',
    component: WordList,
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
