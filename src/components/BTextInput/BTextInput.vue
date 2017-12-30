<template>
  <div class="input-group">
    <label :for="id" v-if="!hideLabel">{{ required ? `${label}*` : label }}</label>
    <textarea
      v-if="multiLine"
      v-bind="{id, name, cols, rows, placeholder, required, disabled, type}"
      :placeholder="placeholder ? placeholder : null"
      :aria-label="hideLabel ? label : null"
    />
    <input
      v-else
      v-bind="{id, name, cols, rows, placeholder, required, disabled}"
      :type="type === 'currency' ? 'text' : type"
      :placeholder="placeholder ? placeholder : null"
      :aria-label="hideLabel ? label : null"
      :class="{error: hasError}"
      v-model="val"
      @blur="inputValidation(val, $event)"
      @keypress.enter="inputValidation(val, $event)"
    />
    <span class="error" v-if="hasError">{{ errorMessage }}</span>
  </div> 
</template>

<script>
export default {
  name: 'b-text-input',
  data () {
    return {
      val: '',
    }
  },
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
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiLine: {
      type: Boolean,
      default: false
    },
    singleLine: {
      type: Boolean,
      default: true
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    inputValidation (value, event) {
      if (this.type === 'currency') {
        const validCurrencyRegex = /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/g
        console.log(event)
        if (!validCurrencyRegex.test(value)) {
          this.hasError = true
          this.errorMessage = `"${this.val}" is not a valid currency.`
        } else {
          this.hasError = false
        }
      }
    }
  }
}
</script>

<style scoped>
  .input-group > label {
    display: block;
    padding-bottom: 5px;
    font-weight: 600;
  }
  .input-group > textarea, input {
    width: calc(100% - 16px);
    padding: 8px;
    border: solid 1px #ccc;
    border-radius: 3px;
  }
  .input-group > textarea.error, input.error {
    border-color: #EE3A3A;
  }
  .input-group > textarea:focus, input:focus {
    -webkit-box-shadow: inset 0px 0px 4px 2px rgba(70, 130, 180, 0.5);
    -moz-box-shadow: inset 0px 0px 4px 2px rgba(70, 130, 180, 0.5);
    box-shadow: inset 0px 0px 4px 2px rgba(70, 130, 180, 0.5);
  }
  .input-group > span.error {
    color: #EE3A3A;
  }
</style>
