<template>
  <div role="radiogroup" v-bind:aria-labelledby="groupId">
    <label v-show="showGroupLabel" v-bind:id="groupId" v-bind:class="{ disabled: disabled }">
      {{ groupLabel }}
    </label>
    <template v-for="(radio, index) in radios">
      <input type="radio" role="radio" v-model="value" 
        v-bind:id="radio.id" 
        v-bind:value="radio.value" 
        v-bind:disabled="radio.disabled || disabled"
        v-bind:tabindex="radio.tabindex"
        v-bind:aria-checked="radio.checked"
        v-bind:aria-labelledby="`label-${radio.id}`"
        v-bind:aria-posinset="index"
        v-bind:aria-setsize="radios.length"
        v-bind:class="{ disabled: radio.disabled || disabled }"
        v-on:change="setCheckedRadio(radio)"
      />
      <label v-bind:id="`label-${radio.id}`" v-bind:for="radio.id" v-bind:class="{ disabled: radio.disabled || disabled }">
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
      validator: value => {
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
  created: function () {
    var defaultRadio = null
    this.radios.forEach((radio) => {
      if (radio.checked) {
        //Set the default checked radio button
        this.value = radio.value
        defaultRadio = radio
      }
    })
    this.setCheckedRadio(defaultRadio)
  }, 
  data: function () {
    return {
      value: ''
    }
  },
  methods: {
    setCheckedRadio: function (checkedRadio) {
      this.radios.forEach((radio, index) => {
        //Radio is checked, so set aria-checked and tabindex
        if (radio == checkedRadio) {
          radio.checked = true
          radio.tabindex = 0
        }
        //Radio not checked, so unset aria-checked and tabindex
        else if (checkedRadio) {
          radio.checked = false
          radio.tabindex = -1
        }
        //No radio is checked, so set first button to be tabbed by default
        else if (index == 0) {
          radio.checked = false
          radio.tabindex = 0
        }
        //No radio is checked, so set rest of the buttons to not be tabbed
        else {
          radio.checked = false
          radio.tabindex = -1
        }
      })
    }
  }
}
</script>

<style scoped>
  .disabled {
    opacity: 0.50; 
    cursor: not-allowed;
  }
</style>
