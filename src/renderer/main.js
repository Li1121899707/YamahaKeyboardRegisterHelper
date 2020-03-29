import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import db from './datastore'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(ViewUI)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db.db

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store, // 这样可以全局使用vuex
  template: '<App/>'
}).$mount('#app')
