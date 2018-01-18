<template>
  <div class="flex">
    <label :for="id" :class="{ disabled: disabled }">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <div v-if="currency" :class="{ currency: true, focused: focused, disabled: disabled, invalid: invalid }" @click="$refs.input.focus()">
      <span style="font-weight: bold;">$</span>
      <input v-model="publicValue" v-bind="Object.assign(inputAttributes,validationAttributes)" v-validate.initial="validations" @focus="focused = true" @blur="focused = false" ref="input" @change="touched = true" />
    </div>
    <input v-else v-model="publicValue" v-bind="Object.assign(inputAttributes,validationAttributes)" v-validate.initial="validations" :class="{ invalid: invalid }" @change="touched = true" />
    <div v-if="invalid" :id="`error-${id}`" class="error">
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
  mixins: [validationMixIn({
    validateOn: 'blur|input'
  })],
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
    }
  },
  data () {
    return {
      focused: false,
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

<style scoped>
  input {
    border: solid 1px #dededf;
    border-radius: 4px;
    color: #333333;
    font-family: SFUIDisplay;
    font-size: 14px;
    padding: 12px;
  }
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    margin: 0;
  }
  input::placeholder {
    color: #c1c1c1;
  }
  label {
    color: #333333;
    display: block;
    font-family: SFUIDisplay;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 6px;
  }
  .currency {
    align-items: baseline;
    border: solid 1px #dededf;
    border-radius: 4px;
    color: #333333;
    cursor: text;
    display: flex;
    font-family: SFUIDisplay;
    font-size: 14px;
    padding: 12px;
  }
  .currency input {
    background-color: transparent;
    border: 0;
    flex-grow: 1;
    padding: 0 0 0 12px;
  }
  .currency input:focus {
    outline: 0;
  }
  .disabled, input:disabled {
    opacity: 0.50;
  }
  .error {
    color: #d0021b;
    font-family: SFUIDisplay;
    font-size: 12px;
    padding-top: 5px;
  }
  .flex {
    display: flex;
    flex-direction: column;
  }
  .focused {
    outline: -webkit-focus-ring-color auto 5px;
    outline-offset: -2px;
  }
  .invalid {
    border: solid 1px #d0021b;
  }
</style>
