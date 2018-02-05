<template>
  <!-- Group checkboxes: requires group id and label -->
  <div v-if="groupId && groupLabel" class="column">
    <div role="group" :aria-labelledby="groupId" class="flex">
      <label :id="`group-${groupId}`" :class="{ bold: true, disabled: disabled }">
        {{ groupLabel }}<span v-if="required" aria-hidden="true">*</span>
      </label>
      <div class="flex wrap">
        <div v-for="(checkbox, index) in checkboxes" :key="index" class="flex baseline">
          <input type="checkbox" 
            v-model="publicValues" 
            v-validate:publicValues.initial="validations"
            v-bind="validationAttributes"
            :aria-checked="values.indexOf(checkbox.id) > -1"
            :aria-describedby="invalid ? `error-${groupId}` : ''"
            :aria-labelledby="`group-${groupId} label-${checkbox.id}`"
            :disabled="checkbox.disabled || disabled"
            :id="checkbox.id"
            :value="checkbox.id"
          />
          <label :id="`label-${checkbox.id}`" :for="checkbox.id">
            {{ checkbox.value }}
          </label>
        </div>
      </div>
    </div>
    <div v-if="touched && invalid" :id="`error-${groupId}`" class="error-text">
      {{ errors.first(validationId, parentScope || validationId) }}
    </div>
  </div>
  <!-- Single checkbox -->
  <div v-else-if="checkboxes.length == 1" class="column">
    <template v-for="(checkbox,index) in checkboxes">
      <div class="flex baseline" :key="index">
        <input type="checkbox" 
          v-model="publicValues" 
          v-validate:publicValues.initial="validations" 
          v-bind="validationAttributes"
          :aria-checked="values.indexOf(checkbox.id) > -1"
          :aria-describedby="invalid ? `error-${checkbox.id}` : ''"
          :aria-labelledby="`label-${checkbox.id}`"
          :disabled="checkbox.disabled || disabled"
          :id="checkbox.id" 
          :value="checkbox.id" 
          :key="index"
        />
        <label :id="`label-${checkbox.id}`" :for="checkbox.id" class="bold" :key="index">
          {{ checkbox.value }}<span v-if="required" aria-hidden="true">*</span>
        </label>
      </div>
      <div v-if="touched && invalid" :id="`error-${checkbox.id}`" class="error-text" :key="index">
        {{ errors.first(validationId, parentScope || validationId) }}
      </div>
    </template>
  </div>
</template>

<script>
import validationMixIn from '../../mixins/validation'

export default {
  name: 'b-checkbox',
  mixins: [validationMixIn()],
  props: {
    //Required props
    /**
    * Array of checkbox objects.
    */   
    checkboxes: {
      type: Array,
      required: true,
      validator (value) {
        if (value.length < 1)
          throw new TypeError('No checkboxes were defined in the array')

        for (let checkbox of value) {
          if (!checkbox.id || !checkbox.value)
            throw new TypeError('Each checkbox must have an id and value defined')
        }
        return true
      }
    },
    //Optional props
    /**
    * Disables control
    */   
    disabled: Boolean,
    /**
    * Id to identify checkbox group.  Needs to be unique.
    */   
    groupId: String,
    /** 
    * Display text of label 
    */
    groupLabel: String,
    /** 
    * Requires at least one checkbox be checked for group to be valid.
    */    
    required: Boolean,
    /** 
    * @ignore
    * Value prop is here for v-model.
    */
    value: Array
  },
  data () {
    return {
      values: this.value || [],
      touched: false
    }
  },
  computed: {
    //Wrapper around values so it is propegated through v-model, or 'public' as I've dubbed it
    publicValues: {
      get () {
        return this.values
      },
      set (value) {
        this.touched = true
        this.values = value
        this.$emit('input', this.values)
      }
    },
    validations () {
      let vals = {}
      if (this.required)
        vals.required = true
      return vals
    }
  }
}
</script>

<style scoped>
    
  .baseline {
    align-items: baseline;
    flex: 1;
  }

  .bold {
    font-weight: bold;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .flex {
    display:flex;
  }

  .wrap {
    flex-wrap: wrap;
  }

  label {
    padding: 0;
    margin-right: 0.3rem;
  }

  input {
    margin-right: 0.3rem;
  }
</style>
