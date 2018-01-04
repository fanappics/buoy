/*
 * Originally written by Vuetify
 */

import Validatable from './validatable'

export default {
  mixins: [Validatable],

  data () {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    }
  },

  props: {
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: {
      type: String,
      required: true
    },
    persistentHint: Boolean,
    placeholder: String,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: () => [13, 32]
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses () {
      return Object.assign({
        'input-group': true,
        'input-group--focused': this.isFocused,
        'input-group--dirty': this.isDirty,
        'input-group--tab-focused': this.tabFocused,
        'input-group--disabled': this.disabled,
        'input-group--error': this.hasError,
        'input-group--required': this.required,
        'input-group--hide-details': this.hideDetails,
        'input-group--placeholder': !!this.placeholder
      }, this.classes)
    },
    isDirty () {
      return !!this.inputValue
    }
  },

  methods: {
    groupFocus (e) {},
    groupBlur (e) {
      this.tabFocused = false
    },
    genLabel () {
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, this.required ? `${this.label}*` : this.label)
    },
    genMessages () {
      let messages = null

      if ((this.hint &&
            this.isFocused ||
            this.hint &&
            this.persistentHint) &&
          this.validations.length === 0
      ) {
        messages = [this.genHint()]
      } else if (this.validations.length) {
        messages = [this.genError(this.validations)]
      }

      return this.$createElement('transition', {
        props: {
          name: 'slide-y-transition'
        }
      }, messages)
    },
    genHint () {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__hint',
        domProps: { innerHTML: this.hint }
      })
    },
    genError (errors) {
      return this.$createElement(
        'div',
        {
          'class': 'input-group__messages input-group__error',
          attrs: {
            id: `error-${this.$attrs.id}`
          }
        },
        errors.length > 1 ? errors.join(', ') : errors[0]
      )
    },
    // Used for clearable, but requires another component

    // genIcon (type, defaultCallback = null) {
    //   const shouldClear = type === 'append' && this.clearable && this.isDirty
    //   const icon = shouldClear ? 'clear' : this[`${type}Icon`]
    //   const callback = shouldClear
    //     ? this.clearableCallback
    //     : (this[`${type}IconCb`] || defaultCallback)

    //   return this.$createElement('v-icon', {
    //     'class': {
    //       [`input-group__${type}-icon`]: true,
    //       'input-group__icon-cb': !!callback,
    //       'input-group__icon-clearable': shouldClear
    //     },
    //     props: {
    //       disabled: this.disabled
    //     },
    //     on: {
    //       click: e => {
    //         if (!callback) return

    //         e.stopPropagation()
    //         callback()
    //       }
    //     }
    //   }, icon)
    // },
    genInputGroup (input, data = {}, defaultAppendCallback = null) {
      const children = []
      const wrapperChildren = []
      const detailsChildren = []

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: () => (this.tabFocused = false),
          keyup: e => {
            if ([9, 16].includes(e.keyCode)) {
              this.tabFocused = true
            }
          },
          keydown: e => {
            if (!this.toggle) return

            if (this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault()
              this.toggle()
            }
          }
        }
      }, data)

      if (this.$slots.label || this.label) {
        children.push(this.genLabel())
      }

      wrapperChildren.push(input)

      children.push(
        this.$createElement('div', {
          'class': 'input-group__input'
        }, wrapperChildren)
      )

      !this.hideDetails && detailsChildren.push(this.genMessages())

      if (this.counter) {
        detailsChildren.push(this.genCounter())
      }

      children.push(
        this.$createElement('div', {
          'class': 'input-group__details'
        }, detailsChildren)
      )

      return this.$createElement('div', data, children)
    }
  }
}
