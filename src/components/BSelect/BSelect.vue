<template>
  <div>
    <div>
      <label>{{selectLabel}}<span v-if=isRequired>*</span></label>
    </div>
    <div>
      <select
        v-bind:aria-label="selectLabel"
      >
        <option disabled selected>Choose Option</option>
        <BSelectOption
          v-for="option in options"
          :key="option.id"
          :option="option"
        />
      </select>
    </div>
  </div>
</template>

<script>

import BSelectOption from '../BselectOption/BSelectOption.vue'

const options = []

export default {
  name: 'b-select',
  components: {
        BSelectOption
    },
  props: {
    selectOptions: {
      type: Array
    },
    isRequired: {
      type: Boolean,
      required: true
    },
    selectLabel: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      options: this.selectOptions
    }
  },
}

</script>

<style scoped>
  select {
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    background-repeat: no-repeat;
    background-size: .8em auto;
    background-position: right 0.25em center;
    background-image: url("data:image/svg+xml;charset=utf-8, \
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40'> \
      <polygon points='0,0 60,0 30,40' style='fill:black;'/> \
    </svg>")
  }
</style>
