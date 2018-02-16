<template>
  <div class="b-flex-column">
    <label :for="id" :class="{ disabled: disabled }">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <textarea
      v-model="publicValue"
      v-validate.initial="validations"
      v-bind="Object.assign(validationAttributes,{id, autocomplete, disabled, maxLength, minLength, placeholder, required, resizable, rows})"
      :class="{ 'fixed-size': !resizable, 'b-error-border': invalid }"
      @blur="touched = true"
    />
    <div v-if="invalid" :id="`error-${id}`" class="b-error-text">
      <span v-for="(error,index) in errors.all()" :key='index'>
        {{ error }}
      </span>
    </div>
  </div> 
</template>

<script>
import validationMixIn from '../../mixins/validation'

export default {
  name: 'b-textarea',
  mixins: [validationMixIn()],
  props: {
    // Required Props
    /** 
    * Component Id.  Needs to be unique. 
    */
    id: {
      type: String,
      required: true
    },
    /**
    * Descriptive text shown above textarea.
    */
    label: {
      type: String,
      required: true
    },
    // Optional Props
    /** 
    * Allows the value to be autocompleted by the browser. 
    */
    autocomplete: Boolean,
    /**
    * Disables the component.
    */  
    disabled: Boolean,
    /**
    * Maximum length of text to pass validation.
    */  
    maxLength: {
      type: [String, Number]
    },        
    /**
    * Minimum length of text to pass validation.
    */
    minLength: {
      type: [String, Number]
    },
    /**
    * Placeholder text of textarea.
    */
    placeholder: String,
    /**
     * Requires text to be input to pass validation.
    */  
    required: Boolean,
    /**
     * Allows the component to be resized in the browser.
    */  
    resizable: Boolean,
    /**
    * How many text rows will be shown by default.
    */   
    rows: {
      type: [String, Number]
    },
    /**
    * @ignore
    * Value prop is here for v-model.
    */
    value: String
  },
  data () {
    return {
      privateValue: this.value || '',
      touched: false // Will be used by validation plugin.
    }
  },
  computed: {
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
    validations () {
      let vals = {}
      if (this.maxLength)
        vals.max = this.maxLength
      if (this.minLength)
        vals.min = this.minLength
      if (this.required)
        vals.required = true
      return vals
    }
  }
}
</script>

<style scoped>

  .fixed-size {
    resize: none;
}
</style>
