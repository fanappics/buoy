<template>
  <div>
    <template v-if="label">
      <label v-bind:for="id">
        <strong>{{ labelText }}<span v-if="required">*</span></strong>
      </label>
      <br />
    </template>
    <span v-if="type === 'currency'" v-bind:class="{currencyinput: true, focus: hasFocus, invalid: !valid}">$
      <input v-model="value" v-bind="{ id, pattern, required }" v-bind:aria-label="labelText" v-bind:class="{ invalid: !valid }" v-on:focus="hasFocus = true" v-on:blur="hasFocus = false" type="number" placeholder="0.00" />
    </span>
    <input v-else v-model="value" v-bind="{ id, pattern, required, type }" v-bind:aria-label="labelText" v-bind:class="{ invalid: !valid }" />
    <template v-if="!valid">
      <br />
      <span class="invalidText">{{ invalidText }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'b-input',
  props: {
    id: {
      type: String,
      required: true
    },
    invalidText: {
      type: String,
      default: 'Invalid input'
    },
    label: {
      type: Boolean
    },
    labelText: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    type: {
      type: String,
      default: 'text',
      validator: value => {
        const validTypes = ['currency', 'date', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week']      
        if (validTypes.indexOf(value) < 0)
          throw new TypeError(`${value} is not a valid type for b-input`)
        return true
      }
    },
    //Dependent on type, initialized after
    pattern: {
      type: String,
      default: function () {
        if (this.type === 'currency')
          return '^\\d+(\\.\\d{2})?$'
        else
          return ''
      }
    }
  },
  data: function () {
    return {
      value: '',
      hasFocus: false
    }
  },
  computed: {
    valid: function () {
      if (this.value === '')
      	return true
      else
        return this.value.match(this.pattern)
    }
  }
}
</script>

<style scoped>
  .currencyinput {
    border: 1px inset #ccc;
  }
  .currencyinput input {
    border: 0;    
  }
  .currencyinput input:focus {
    outline: 0;
  }
  .focus {
    outline: -webkit-focus-ring-color auto 5px;
  }
  .invalid {
    border: 3px solid red;
  }
  .invalidText {
    color: red; 
    font-size: 10pt;
  }
</style>
