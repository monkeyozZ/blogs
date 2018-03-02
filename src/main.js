// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'
import Calendar from 'vue-calendar-component'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'font-awesome/css/font-awesome.css'
import 'animate.css'

var instance = axios.create({
  // baseURL: 'http://127.0.0.1/tp_test/index.php',
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
Vue.use(VueAxios, instance)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(Calendar)
Vue.filter('getLocalTime', function (nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString()
})
Vue.filter('sub', function (str) {
  if (str.length > 75) {
    return str.substring(0, 75) + '...'
  } else {
    return str
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
