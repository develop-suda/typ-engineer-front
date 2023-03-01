// @ts-nocheck
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import utils from '../mixins/utils'
import Vuelidate from 'vuelidate';
import VueCookies from 'vue-cookies'

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"; // 追加
import "bootstrap/dist/css/bootstrap.css"; // 追加
import "bootstrap-vue/dist/bootstrap-vue.css"; // 追加

Vue.use(BootstrapVue); // 追加
Vue.use(BootstrapVueIcons); // 追加

Vue.config.productionTip = false;
Vue.use(VueAxios, axios, Vuelidate, VueCookies);
// Vue.mixin(utils)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
