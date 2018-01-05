// import BTextInput from './BTextInput.vue'
import BTextarea from './BTextarea.vue'

/* istanbul ignore next */
BTextarea.install = function install (Vue) {
  Vue.component(BTextarea.name, BTextarea)
}

export default BTextarea
