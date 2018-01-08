<template>
  <div :class="classes">
    <label v-if="!hideLabel" :for="id">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <textarea
      v-model="inputValue"
      v-bind="{id, name, cols, rows, placeholder, required, disabled, placeholder, hideLabel}"
    />
    <div class="b-input-group--error">
      <span></span>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'b-textarea',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    cols: {
      type: Number,
      default: 30
    },
    rows: {
      type: Number,
      default: 5
    },
    placeholder: String,
    hideLabel: Boolean,
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return {
        'b-input-group': true,
        'b-input-group--disabled': this.disabled
      }
    },
    inputValue: {
      get () {},
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .b-input-group
    label
      color #333
      display block
      font-size 0.825rem
      font-weight bold
      padding 0.6rem 0 0.4rem
    &.b-input-group--disabled
      label
        color #999

  .b-input-group
    textarea
      border 1px solid rgba(138, 138, 138, 0.6)
      border-radius .25rem
      font-size .87rem
      padding .7rem
    ::placeholder
      font-size 0.8rem
    &.b-input-group--disabled
      textarea
        border-color rgba(138, 138, 138, 0.3)
        &:hover
          cursor not-allowed
      ::placeholder
        color #BBB

  .b-error
    textarea
      border 1px solid red
</style>
