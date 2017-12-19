import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Buoy from 'buoy'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(Buoy)
Vue.use(VueRouter)

Vue.component(Boilerplate.name, Boilerplate)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
