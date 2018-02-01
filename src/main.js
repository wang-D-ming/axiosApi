// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios  from 'axios'
import httpaopApi  from './httpApi'

Vue.config.productionTip = false
Window.prototype.$axios=axios
// $axios.defaults.baseURL='./api/perfect'
$axios.defaults.baseURL="./"

/**
 * httpaopApi 
 * false 预处理 true 按需处理  第二个参数默认false
 */
Vue.use(httpaopApi,true)


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
