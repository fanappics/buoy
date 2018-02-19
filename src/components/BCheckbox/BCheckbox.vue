<template>
  <!-- Group checkboxes: requires group id and label -->
  <div v-if="groupId && groupLabel" class="b-checkbox b-flex-column">
    <div role="group" :aria-labelledby="groupId">
      <label :id="`group-${groupId}`" :class="{ 'b-checkbox-group-label': true }">
        {{ groupLabel }}<span v-if="required" aria-hidden="true">*</span>
      </label>
      <div class="b-flex b-flex-wrap">
        <div v-for="(checkbox, index) in checkboxes" :key="index" class="b-flex b-flex-center">
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
    <div v-if="touched && invalid" :id="`error-${groupId}`" class="b-error-text">
      {{ errors.first(validationId, parentScope || validationId) }}
    </div>
  </div>
  <!-- Single checkbox -->
  <div v-else-if="checkboxes.length == 1" class="b-checkbox b-flex-column">
    <template v-for="(checkbox,index) in checkboxes">
      <div class="b-flex b-flex-center" :key="index">
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
        <label :id="`label-${checkbox.id}`" :for="checkbox.id" :key="index">
          {{ checkbox.value }}<span v-if="required" aria-hidden="true">*</span>
        </label>
      </div>
      <div v-if="touched && invalid" :id="`error-${checkbox.id}`" class="b-error-text" :key="index">
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

<style lang="stylus" scoped>
  @import "../../styles/colors"

  .b-checkbox
    margin-bottom 0.75rem

  .b-checkbox-group-label
    margin 0 0 1rem 0

  label
    margin-right 1.25rem
    padding 0

  input
    -webkit-appearance none
    -moz-appearance none
    background white
    border 1px solid $checkbox-border
    border-radius 2px
    box-shadow none
    height 0.875rem
    margin 0 0.75rem 0 0
    padding 0.375rem
    &:checked
      padding 0 0.092rem
      &::before
        color $checkbox-check
        content "\f3fd"
        font-family "Ionicons"
        font-size 1.6em
        line-height 0.9rem
    &:focus
      border-bottom 1px solid $input-focus
      box-shadow none

</style>
