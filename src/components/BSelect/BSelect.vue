<template>
  <div>
    <div>
      <label>{{selectLabel}}<span v-if=isRequired>*</span></label>
    </div>
    <div>
      <select
        v-bind:aria-label="selectLabel"
        v-bind:required="isRequired ? true : false"
      >
        <option disabled selected>Choose Option</option>
        <option
          v-for="option in options"
          v-bind:key="option.id"
          v-bind:option="option"
          v-bind:value=option.id
        > {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>

const options = []

export default {
  name: 'b-select',

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
    </svg>");
    padding: 1em;
  }
</style>
