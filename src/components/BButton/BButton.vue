<template>
  <button
    :aria-label="'aria-label'"
    :disabled="disabled"
    :style="computedStyle"
    :class="computedClass"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'b-button',
  props: {
    'aria-label': {
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
      // if any classes are passed through, provided them to the component as an array of strings
      const classArray = this.class ? this.class.split(' ') : [];

      // can do differential class application in the future here, i.e.,
      // we may want to break out 'color' as a prop to improve readability:
      // if (this.color && !classArray.includes(this.color)) {
        // classArray.push(this.color)
      // }

      return classArray
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
