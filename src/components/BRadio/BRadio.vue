<template>
  <div role="radiogroup" :aria-labelledby="groupId">
    <label v-show="showGroupLabel" :id="groupId" :class="{ disabled: disabled }">
      {{ groupLabel }}
    </label>
    <template v-for="(radio, index) in radios">
      <input type="radio" v-model="publicValue" 
        :id="radio.id"
        :name="groupId"
        :value="radio.value"
        :disabled="radio.disabled || disabled"
        :aria-checked="radio.checked"
        :aria-labelledby="groupId + ` label-${radio.id}`"
        :aria-posinset="index"
        :aria-setsize="radios.length"
        @change="setCheckedRadio(radio)"
      />
      <label :id="`label-${radio.id}`" :for="radio.id">
        {{ radio.value }}
      </label>
    </template>
  </div>
</template>

<script>
export default {
  name: 'b-radio',
  props: {
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
    disabled: {
      type: Boolean
    },
    groupId: {
      type: String,
      required: true
    },
    groupLabel: {
      type: String,
      required: true
    },
    showGroupLabel: {
      type: Boolean
    }
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
  .disabled, input:disabled, input:disabled+label {
    opacity: 0.50; 
    cursor: not-allowed;
  }
</style>
