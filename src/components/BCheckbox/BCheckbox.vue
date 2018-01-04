<template>
  <div role="group" v-bind:aria-labelledby="groupId">
    <label v-if="showGroupLabel" v-bind:id="groupId" v-bind:class="{ disabled: disabled }">
      {{ groupLabel }}
    </label>
    <template v-for="checkbox in checkboxes">
      <input type="checkbox" role="checkbox" v-model="checkedValues" 
        v-bind:id="checkbox.id" 
        v-bind:value="checkbox.value" 
        v-bind:disabled="checkbox.disabled || disabled"
        v-bind:aria-checked="checkbox.checked"
        v-bind:aria-labelledby="`label-${checkbox.id}`"
        v-bind:class="{ disabled: checkbox.disabled || disabled }"
        v-on:change="toggleCheckbox(checkbox)"
      />
      <label v-bind:id="`label-${checkbox.id}`" v-bind:for="checkbox.id" v-bind:class="{ disabled: checkbox.disabled || disabled }">
        {{ checkbox.value }}
      </label>
    </template>
  </div>
</template>

<script>
export default {
  name: 'b-checkbox',
  props: {
    checkboxes: {
      type: Array,
      required: true,
      validator: value => {
        for (let checkbox of value) {
          if (!checkbox.id || !checkbox.value)
            throw new TypeError('Each checkbox must have an id and value defined')
        }
        return true
      }
    },
    disabled: {
      type: Boolean
    },
    groupId: {
      type: String
    },
    groupLabel: {
      type: String
    },
    showGroupLabel: {
      type: Boolean
    }
  },
  created: function () {
    //Set the default checked checkboxes
    this.checkboxes.forEach((checkbox) => {
      if (checkbox.checked)
        this.checkedValues.push(checkbox.value)
    })
  },
  data: function () {
    return {
      checkedValues: []
    }
  },
  methods: {
    toggleCheckbox: function (checkbox) {
      //Checkbox is checked, set aria-checked
      if (this.checkedValues.indexOf(checkbox.value) > -1)
        checkbox.checked = true
      //Checkbox not checked, unset aria-checked
      else
        checkbox.checked = false
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
