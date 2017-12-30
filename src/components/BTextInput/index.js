// import BTextInput from './BTextInput.vue'
import BTextInput from './BTextInput.js'

/* istanbul ignore next */
BTextInput.install = function install (Vue) {
  Vue.component(BTextInput.name, BTextInput)
}

export default BTextInput
