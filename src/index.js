import * as components from './components'
import { peerDependencies, version } from '../package.json'
import Semver from 'semver'

const Installer = {
  install (Vue, options = {}) {
    if (this.installed) return

    this.installed = true

    const $buoy = {}

    Vue.prototype.$buoy = $buoy

    components.forEach(c => {
      Vue.use(c)
    })
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
    console.warn(`Vuetify requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion()
  window.Vue.use(Buoy)
}

export default Buoy
