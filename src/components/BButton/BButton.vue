<template>
  <button
    :id="id"
    :class="['b-button', color]"
    :title="iconOnly ? label : ''"
    :disabled="disabled"
    @click="onClick($event)"
  >
    <!-- @slot To add icon, use `i` or `span` element -->
    <slot name="icon"></slot>
    {{ iconOnly ? '' : label }}
  </button>
</template>

<script>
export default {
  name: 'b-button',
  props: {
    /**
    * Component Id - defaults to button-randomNumber
    */
    id: {
      type: String,
      required: false,
      default () {
        return `button-${this._uid}`
      }
    },
    /**
    * Component label - default content of button
    */
    label: {
      type: String,
      required: true
    },
    // Optional props
    /**
     * Determines color of button. Choose from: `b-primary`, `b-secondary`, `b-tertiary`
     */
    color: {
      type: String,
      required: false,
      default: 'b-primary',
      validator (value) {
        const validTypes = ['b-primary', 'b-secondary', 'b-tertiary']
        if (validTypes.indexOf(value) < 0)
          throw new TypeError(`${value} is not a valid color for b-button`)
        return true
      }
    },
    /**
    * Disables button so it cannot be clicked
    */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
    * Renders button with no visible label, just the icon slot which must be provided
    */
    iconOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: 'button',
      validator (value) {
        const validTypes = ['button', 'submit', 'reset']
        if (validTypes.indexOf(value) < 0)
          throw new TypeError(`${value} is not a valid type for b-button`)
        return true
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    onClick (event) {
      /**
      * Event fires when the button is pressed
      *
      * @event click
      * @type event
      */
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/colors"

button
  border none
  border-radius 2px
  color $button-text
  cursor pointer
  font-weight 600
  margin 0.525rem
  padding 0.75rem 2rem
  &.b-primary, &.b-secondary, &.b-tertiary
    &:active, &:disabled, &:focus
      border none
  &.b-primary
    background-color $button-background
    &:active
      background-color $button-background-active
      box-shadow inset 0 1px 5px 0 rgba(0, 0, 0, 0.2)
    &:focus
      background-color $button-background-focus
      box-shadow inset 0 1px 5px 0 rgba(48, 48, 48, 0.4)
      outline none
  &.b-secondary
    background-color $secondary-button-background
    &:active
      background-color $secondary-button-background-active
      box-shadow inset 0 1px 5px 0 rgba(54, 52, 54, 0.8)
    &:focus
      background-color $secondary-button-background-focus
      box-shadow inset 0 1px 5px 0 rgba(54, 52, 54, 0.8)
      outline none
  &.b-tertiary
    color $tertiary-button-text
    font-size 0.75rem
    line-height 1.2rem
    padding 0
    i, span
      font-size 1.2rem
      padding-right 0.3125rem
      vertical-align middle
    &:active
      color $tertiary-button-text-active
    &:focus
      outline-color $input-focus
  &:disabled, &:disabled:active, &:disabled:focus
    background $button-background-disabled
    box-shadow none
    color $button-text-disabled
    cursor not-allowed
    opacity 1
    
</style>
