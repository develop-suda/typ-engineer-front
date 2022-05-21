'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _vue = _interopRequireDefault(require('vue'))

var _vueRouter = _interopRequireDefault(require('vue-router'))

var _Home = _interopRequireDefault(require('../components/Home.vue'))

var _Main = _interopRequireDefault(require('../components/Main'))

var _Axios = _interopRequireDefault(require('../components/Axios'))

var _Typmode = _interopRequireDefault(require('../components/typmode/Typmode'))

var _regist = _interopRequireDefault(require('../components/Register/Register'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

_vue['default'].use(_vueRouter['default'])

var routes = [
  {
    path: '/',
    name: 'Home',
    component: _Home['default']
  },
  {
    path: '/typ',
    name: 'Typ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: _Main['default'],
    props: true
  },
  {
    path: '/axios',
    name: 'Axios',
    component: _Axios['default']
  },
  {
    path: '/typmode',
    name: 'Typmode',
    component: _Typmode['default']
  },
  {
    path: '/Register',
    name: 'Register',
    component: _regist['default']
  }
]
var router = new _vueRouter['default']({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
var _default = router
exports['default'] = _default
