<template>
  <div class="container" :class="{ disabled: disabled }">
    <div role="radiogroup" :aria-labelledby="groupId">
      <label :id="groupId" class="description">
      {{ groupLabel }}<span v-if="required" aria-hidden="true">*</span>
      </label>
      <div class="button-group input" role="radiogroup">
        <div v-for="(radio, index) in radios" class="button" :key="index">
          <input type="radio" 
            v-model="publicValue" 
            v-validate.initial="index === 0 ? validations : {}"
            v-bind="index === 0 ? validationAttributes : {}"
            :aria-checked="publicValue === radio.id"
            :aria-describedby="errors.any() ? `error-${groupId}` : ''"
            :aria-labelledby="`${groupId} label-${radio.id}`"
            :aria-posinset="index"
            :aria-setsize="radios.length"
            :disabled="radio.disabled || disabled"
            :id="radio.id"
            :name="groupId"
            :value="radio.id"
          />
          <label :id="`label-${radio.id}`" :for="radio.id">
            {{ radio.value }}
          </label>
        </div>
        <div v-if="errors.any() && showErrors" :id="`error-${groupId}`" class="error-text">
          <span v-for="(error,index) in errors.all()" :key="index">
            {{ error }}
          </span>
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
import validationMixIn from '../../mixins/validation'

export default {
  name: 'b-radio',
  mixins: [validationMixIn()],
  props: {
    //Required props
    /**
    * Each radio group needs a unique id.
    */
    groupId: {
      type: String,
      required: true
    },
    /**
    * Descriptive text about the radio group.
    */
    groupLabel: {
      type: String,
      required: true
    },
    /**
    * Array of Objects containing all buttons included in radio group.
    */
    radios: {
      type: Array,
      required: true,
      validator (value) {
        for (let radio of value) {
          if (!radio.id || !radio.value)
            throw new TypeError('Each radio must have an id and value defined')
        }
        return true
      }
    },
    //Optional props
    /**
    * Disables the entire radio group.
    */
    disabled: Boolean,
    /**
    * Requires a selection to pass validatin. 
    */
    required: Boolean,
    value: String
  },
  data () {
    return {
      showErrors: false,
      checked: this.value || ''
    }
  },
  computed: {
    //Wrapper around value so it is propegated through v-model, or 'public' as I've dubbed it
    publicValue: {
      get () {
        return this.checked
      },
      set (value) {
        this.checked = value.toString()
        this.$emit('input', this.checked)
      }
    },
    validations () {
      let vals = {}
      if (this.required)
        vals.required = true
      return vals
    }
  },
  created: function() {
    const duplicateId = false;
    
    for (let i = 0; i < this.radios.length; i++) {
      if (this.groupId == this.radios[i].id) {
        throw new Error(`Radio option id ${this.radios[i].id} cannot match GroupId`)
      } 
    }
  },
  methods: {
    onValidate (scope) {
      if (!this.parentScope || this.parentScope === scope) {
        this.showErrors = true
      }
    }
  }
}
</script>

<style scoped>
  label {
    flex-grow: 0;
  }

  .button {
    display: flex;
    align-items: baseline;
    padding: .5rem;
  }

  .button > input {
    margin-right: .5rem;
  }

  .button input[type="radio"]:checked+label {
    font-weight: 600;  
  }

  .button-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .description {
    font-weight: 600;
  }

</style>
