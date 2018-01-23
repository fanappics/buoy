<template>
  <button
    :aria-label="ariaLabel"
    :class="computedClass"
    :disabled="disabled"
    :style="computedStyle"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  /**
   * Component example provided here.
   *
   * @example ./Readme.md
   */
  name: 'b-button',
  props: {
    'ariaLabel': {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    height: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    width: {
      type: String,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {
    computedClass () {
      const classObj = {}

      // get current classes and check if abstracted classes are already present
      // don't copy them if so, otherwise, put them in classObj
      const classArray = this.class ? this.class.split(' ') : [];
      if (this.color && !classArray.includes(this.color)) {
        classObj[this.color] = this.color
      }

      return classObj
    },
    computedStyle () {
      // allow size to be adjusted via props
      const styleObject = {}
      if (this.height) {
        styleObject.height = this.height
      }
      if (this.width) {
        styleObject.width = this.width
      }
      return styleObject
    }
  }
}
</script>

<style scoped>
button {
  background-color: #00AAED;
  border-color: #00AAED;
  color: #FFFFFF;
}
</style>
