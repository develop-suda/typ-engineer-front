import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import utils from '../mixins/utils'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(VueAxios, axios, Vuelidate)
// Vue.mixin(utils)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
