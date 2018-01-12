import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Buoy from 'buoy'
import VueRouter from 'vue-router'
import router from './router'
import VeeValidate from 'vee-validate'


const validationConfig = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: false,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',
  inject: true,
  validity: false,
  aria: true,
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
}

Vue.use(Buoy)
Vue.use(VueRouter)
Vue.use(VeeValidate, validationConfig)

Vue.component(Boilerplate.name, Boilerplate)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
