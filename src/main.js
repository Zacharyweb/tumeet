// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './http'
import App from './App'
import router from './router'
import store from './store'
import PubSub from 'pubsub-js'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.prototype.axios = axios;
Vue.prototype.$PubSub = PubSub;
Vue.config.productionTip = false

// Vue.use(Vuex)
Vue.use(VueAwesomeSwiper);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
