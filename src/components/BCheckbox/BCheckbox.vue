<template>
  <!-- Group checkboxes: requires group id and label -->
  <div v-if="groupId && groupLabel" role="group" :aria-labelledby="groupId">
    <label :id="groupId" :class="{ bold: true, disabled: disabled }">
      {{ groupLabel }}<span v-if="required" aria-hidden="true">*</span>
    </label>
    <template v-for="checkbox in checkboxes">
      <input type="checkbox" v-model="publicValues" v-validate:publicValues.initial="validations"
        :aria-checked="values.indexOf(checkbox.id) > -1"
        :aria-describedby="invalid ? `error-${groupId}` : ''"
        :aria-labelledby="`${groupId} label-${checkbox.id}`"
        :disabled="checkbox.disabled || disabled"
        :id="checkbox.id"
        :value="checkbox.id"
        :data-vv-name="field"
        :data-vv-scope="parentScope"
        data-vv-validate-on="input"
        @change="toggleCheckbox(checkbox)"
      />
      <label :id="`label-${checkbox.id}`" :for="checkbox.id">
        {{ checkbox.value }}
      </label>
    </template>
    <div v-if="touched && invalid" :id="`error-${groupId}`" class="error">
      {{ errors.first(field, parentScope) }}
    </div>
  </div>
  <!-- Single checkbox -->
  <div v-else-if="checkboxes.length == 1">
    <template v-for="checkbox in checkboxes">
      <input type="checkbox" v-model="publicValues" v-validate:publicValues.initial="validations"
        :aria-checked="values.indexOf(checkbox.id) > -1"
        :aria-describedby="invalid ? `error-${checkbox.id}` : ''"
        :aria-labelledby="`label-${checkbox.id}`"
        :disabled="checkbox.disabled || disabled"
        :id="checkbox.id" 
        :value="checkbox.id" 
        :data-vv-name="field"
        :data-vv-scope="parentScope"
        data-vv-validate-on="input"
        @change="toggleCheckbox(checkbox)"
      />
      <label :id="`label-${checkbox.id}`" :for="checkbox.id" class="bold">
        {{ checkbox.value }}<span v-if="required" aria-hidden="true">*</span>
      </label>
      <div v-if="touched && invalid" :id="`error-${checkbox.id}`" class="error">
        {{ errors.first(field, parentScope) }}
      </div>
    </template>
  </div>
</template>

<script>
import events from '../../event-bus'

export default {
  name: 'b-checkbox',
  props: {
    //Required props
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
    disabled: Boolean,
    groupId: String,
    groupLabel: String,
    name: String,
    required: Boolean,
    value: Array
  },
  inject: {
    parentScope: {
      default: null
    }
  },
  created () {
    //Can't enforce this in the checkboxes validator so this is the earliest we can throw an error
    if (this.checkboxes.length > 1 && (!this.groupId || !this.groupLabel))
      throw new TypeError('Must define group-id and group-label for multiple checkboxes')

    events.$on('validate', this.onValidate)
  },
  beforeDestroy () {
    events.$off('validate', this.onValidate)
  },
  data () {
    return {
      values: this.value || [],
      touched: false
    }
  },
  computed: {
    field () {
      return this.name || this.groupId || this.checkboxes[0].id
    },
    invalid () {
      return this.errors.any()
    },
    //Wrapper around values so it is propegated through v-model, or 'public' as I've dubbed it
    publicValues: {
      get () {
        return this.values
      },
      set (value) {
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
  },
  watch: {
    'errors.items': {
      handler: function(errors) {
        events.$emit('errorsChanged', errors, this.field, this.parentScope)
      }
    }
  },
  methods: {
    onValidate (scope) {
      if (!this.parentScope || this.parentScope === scope) {
        this.$validator.validateAll(scope)
        this.touched = true
      }
    },
    toggleCheckbox (checkbox) {
      //Checkbox is checked, set aria-checked
      if (this.values.indexOf(checkbox.value) > -1)
        checkbox.checked = true
      //Checkbox not checked, unset aria-checked
      else
        checkbox.checked = false
      this.touched = true
    }
  }
}
</script>

<style scoped>
  label {
    color: #333333;
    font-family: SFUIDisplay;
    font-size: 14px;
    padding-bottom: 6px;
  }
  .bold {
    font-weight: bold;
  }
  .disabled, input:disabled, input:disabled+label {
    opacity: 0.50;
  }
  .error {
    color: #d0021b;
    font-family: SFUIDisplay;
    font-size: 12px;
    padding-top: 5px;
  }
</style>
