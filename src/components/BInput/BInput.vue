<template>
  <div class="b-input b-flex-column">
    <label :for="id" :class="{ 'b-disabled': disabled }">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <div v-if="currency" :class="{ 'b-input-el': true, currency: true, 'b-focus': focused, 'b-disabled': disabled, 'b-error-border': showErrors }" @click="$refs.input.focus()">
      <span style="font-weight: bold;">$</span>
      <input v-model="publicValue" v-bind="Object.assign(inputAttributes,validationAttributes)" v-validate.initial="validations" @focus="focused = true" @blur="focused = false; touched = true" ref="input" />
    </div>
    <input v-else v-model="publicValue" v-bind="Object.assign(inputAttributes,validationAttributes)" v-validate.initial="validations" :class="{ 'b-error-border': showErrors }" @blur="touched = true" />
    <div v-if="showErrors" :id="`error-${id}`" class="b-error-text">
      <span v-for="(error,index) in errors.all()" :key='index'>
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
import validationMixIn from '../../mixins/validation'

export default {
  name: 'b-input',
  mixins: [validationMixIn('blur|input')],
  props: {
    //Required props
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    //Optional props
    autofocus: Boolean,
    disabled: Boolean,
    max: Number,
    maxlength: Number,
    min: Number,
    minlength: Number,
    name: String,
    pattern: String,
    placeholder: String,
    readonly: Boolean,
    required: Boolean,
    type: {
      type: String,
      default: 'text',
      validator (value) {
        const validTypes = ['currency', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week']      
        if (validTypes.indexOf(value) < 0)
          throw new TypeError(`${value} is not a valid type for b-input`)
        return true
      }
    },
    value: String

  },
  data () {
    return {
      focused: false,
      privateValue: this.value || '',
      touched: false
    }
  },
  computed: {
    inputAttributes () {
      return {
        'aria-describedby': this.invalid ? `error-${this.id}` : '',
        'aria-label': this.label,
        'autofocus': this.autofocus,
        'disabled': this.disabled,
        'id': this.id,
        'name': this.name,
        'pattern': this.pattern,
        'placeholder': this.currency && !this.placeholder ? '0.00' : this.placeholder,
        'readonly': this.readonly,
        'required': this.required,
        'type': this.currency ? 'number' : this.type
      }
    },
    currency () {
      return this.type === 'currency'
    },
    // Wrapper around privateValue so it is propegated through v-model, or 'public' as I've dubbed it
    publicValue: {
      get () {
        return this.privateValue
      },
      set (value) {
        this.privateValue = value
        this.touched = true
        this.$emit('input', this.privateValue)
      }
    },
    showErrors () {
      return this.touched && this.invalid
    },
    //Creates an object that VeeValidate reads to apply certain rules
    validations () {
      let vals = {}
      if (this.max)
        vals.max_value = this.max
      if (this.maxlength)
        vals.max = this.maxlength
      if (this.min)
        vals.min_value = this.min
      if (this.minlength)
        vals.min = this.minlength
      if (this.pattern)
        vals.regex = this.pattern
      if (this.required)
        vals.required = true
      switch (this.type) {
        case 'currency':
          vals.decimal = 2
          break
        case 'email':
          vals.email = true
          break
        case 'tel':
          vals.digits = 10
          break
        case 'url':
          vals.url = true
      }
      return vals
    }
  }
}
</script>

<style lang="stylus" scoped>
  .b-currency
    align-items baseline
    cursor text
    display flex
    input
      background-color transparent
      border 0
      flex-grow 1
      padding 0 0 0 12px
      :focus
        box-shadow none

</style>
