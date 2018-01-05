<template>
  <div class="b-input-group">
    <label v-if="!hideLabel" :for="id">
      <strong> 
        {{ label }}<span v-if="required" aria-label="Required">*</span>
      </strong>   
    </label>
    <textarea
      v-model="inputValue"
      v-bind="{id, name, cols, rows, placeholder, required, disabled}"
      :placeholder="placeholder ? placeholder : null"
      :aria-label="hideLabel ? label : null"
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
    inputValue: {
      get () {},
      set (v) {
        this.$emit('input', v)
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

  .b-input-group
    textarea
      border 1px solid rgba(138, 138, 138, 0.6)
      border-radius .25rem
      font-size .87rem
      padding .7rem
    ::placeholder
      font-size 0.8rem

  .b-error
    textarea
      border 1px solid red
</style>
