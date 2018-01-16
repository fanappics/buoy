import * as components from './components'
import { peerDependencies, version } from '../package.json'
import Semver from 'semver'
import VeeValidate from 'vee-validate'

const Installer = {
  install (Vue, options = {}) {
    if (this.installed) return

    this.installed = true

    const $buoy = {}

    Vue.prototype.$buoy = $buoy

    for (const key in components) {
      Vue.use(components[key])
    }

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

    Vue.use(VeeValidate, validationConfig)
  }
}

function Buoy (Vue, options) {
  const Buoy = Installer
  Vue.use(Buoy)
}

Buoy.version = version

function checkVueVersion () {
  const vueDep = peerDependencies.vue
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    console.warn(`buoy requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion()
  window.Vue.use(Buoy)
}

export default Buoy
