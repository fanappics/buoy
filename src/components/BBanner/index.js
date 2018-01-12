import BBanner from './BBanner.vue'

/* istanbul ignore next */
BBanner.install = function install (Vue) {
  Vue.component(BBanner.name, BBanner)
}

export default BBanner
