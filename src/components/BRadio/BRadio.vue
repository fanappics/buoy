<template>
  <div role="radiogroup" :aria-labelledby="groupId" class="flex">
    <label :id="groupId" :class="{ disabled: disabled }">
      {{ groupLabel }}<span v-if="required" aria-hidden="true">*</span>
    </label>
    <div>
      <template v-for="(radio, index) in radios">
        <input type="radio" v-model="publicValue" v-validate="index == 0 ? validations : {}"
          :aria-checked="radio.checked"
          :aria-describedby="errors.any() ? `error-${groupId}` : ''"
          :aria-labelledby="`${groupId} label-${radio.id}`"
          :aria-posinset="index"
          :aria-setsize="radios.length"
          :disabled="radio.disabled || disabled"
          :id="radio.id"
          :name="groupId"
          :value="radio.value"
          @change="setCheckedRadio(radio)" 
        />
        <label :id="`label-${radio.id}`" :for="radio.id">
          {{ radio.value }}
        </label>
      </template>
      <div v-if="errors.any()" :id="`error-${groupId}`" class="error">
        <span v-for="error in errors.all()">
          {{ error }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-radio',
  props: {
    //Required props
    groupId: {
      type: String,
      required: true
    },
    groupLabel: {
      type: String,
      required: true
    },
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
    disabled: Boolean,
    required: Boolean
  },
  created () {
    var defaultRadio = null
    this.radios.forEach((radio) => {
      if (radio.checked) {
        //Set the default checked radio button
        this.publicValue = radio.value
        defaultRadio = radio
      }
    })
    this.setCheckedRadio(defaultRadio)
  }, 
  data () {
    return {
      value: ''
    }
  },
  computed: {
    //Wrapper around value so it is propegated through v-model, or 'public' as I've dubbed it
    publicValue: {
      get () {
        return this.value
      },
      set (value) {
        this.value = value
        this.$emit('input', this.value)
      }
    },
    validations () {
      let vals = {}
      if (this.required)
        vals.required = true
      return vals
    }
  },
  methods: {
    setCheckedRadio (checkedRadio) {
      this.radios.forEach((radio) => {
        //Radio is checked, so set aria-checked
        if (radio == checkedRadio)
          radio.checked = true
        //Radio not checked, so unset aria-checked
        else
          radio.checked = false
      })
    }
  }
}
</script>

<style scoped>
  label {
    color: #333333;
    font-family: SFUIDisplay;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 6px;
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
  .flex {
    display: flex;
    flex-direction: column
  }
</style>
