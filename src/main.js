// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/animate.css'

//ajax
import axios from './lib/myAxios'
Vue.prototype.$http = axios ; //其他页面在使用axios的时候直接  this.$http就可以了

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
