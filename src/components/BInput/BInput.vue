<template>
  <div class="flex">
    <label :for="id" :class="{ disabled: disabled }">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <span v-if="type === 'currency'" :class="{ currencyinput: true, focus: hasFocus, disabled: disabled, invalid: errors.any() }" @click="$refs.input.focus()">
      <strong>$</strong>
      <input v-model="publicValue" v-bind="inputAttributes" v-validate="validations" @focus="hasFocus = true" @blur="hasFocus = false" ref="input" />
    </span>
    <input v-else v-model="publicValue" v-bind="inputAttributes" v-validate="validations" :class="{ invalid: errors.any() }" />
    <template v-if="errors.any()">
      <span :id="'error-' + id" class="error">
        <div v-for="error in errors.all()">
          {{ error }}
        </div>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'b-input',
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
      privateValue: this.value ? this.value : '',
      hasFocus: false
    }
  },
  computed: {
    inputAttributes () {
      return {
        'aria-describedby': this.errors.any() ? 'error-' + this.id : '',
        'aria-label': this.label,
        'aria-required': this.required,
        'autofocus': this.autofocus,
        'data-vv-as': this.type,
        'data-vv-validate-on': 'input|blur',
        'disabled': this.disabled,
        'id': this.id,
        'name': this.name,
        'pattern': this.pattern,
        'placeholder': this.type === 'currency' && !this.placeholder ? '0.00' : this.placeholder,
        'readonly': this.readonly,
        'required': this.required,
        'type': this.type === 'currency' ? 'number' : this.type
      }
    },
    //Wrapper around privateValue so it is propegated through v-model, or 'public' as I've dubbed it
    publicValue: {
      get () {
        return this.privateValue
      },
      set (value) {
        this.privateValue = value
        this.$emit('input', this.privateValue)
      }
    },
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
  },
  methods: {
    validate () {

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
    font-weight: 600;
    padding-bottom: 6px;
  }
  .currencyinput {
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
  .currencyinput input {
    background-color: transparent;
    border: 0;
    flex-grow: 1;
    padding: 0 0 0 12px;
  }
  .currencyinput input:focus {
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
  .focus {
    outline: -webkit-focus-ring-color auto 5px;
    outline-offset: -2px;
  }
  .invalid {
    border: solid 1px #d0021b;
  }
</style>
