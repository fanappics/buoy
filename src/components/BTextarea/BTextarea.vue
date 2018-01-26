<template>
  <div class="flex">
    <label :for="id" :class="{ disabled: disabled }">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <textarea
      v-validate="validations"
      v-bind="Object.assign(validationAttributes,{id, name, autocomplete, disabled, maxlength, minlength, placeholder, required, resizable, rows})"
      :class="{ 'fixed-size': !resizable, 'invalid': invalid }"
    />
    <div v-if="invalid" :id="`error-${id}`" class="error-text">
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
    /**
    * Name given to component.  This can be different than the id.
    */
    name: {
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
    maxlength: {
      type: [String, Number]
    },        
    /**
    * Minimum length of text to pass validation.
    */
    minlength: {
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
    }
  },
  computed: {
    inputValue: {
      get () {},
      set (value) {
        this.$emit('input', value)
      }
    },
    validations () {
      let vals = {}
      if (this.maxlength)
        vals.max = this.maxlength
      if (this.min)
        vals.min_value = this.min
      if (this.minlength)
        vals.min = this.minlength
      if (this.required)
        vals.required = true
      return vals
    }
  }
}
</script>

<style scoped>
  textarea:not(.invalid) {
    box-shadow: none;
  }

  .flex {
    display: flex;
    flex-direction: column;
  }

  .fixed-size {
    resize: none;
}
</style>
