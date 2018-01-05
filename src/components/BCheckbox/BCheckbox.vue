<template>
  <div v-if="groupId && groupLabel" role="group" :aria-labelledby="groupId">
    <label v-show="showGroupLabel" :id="groupId" :class="{ disabled: disabled }">
      {{ groupLabel }}
    </label>
    <template v-for="checkbox in checkboxes">
      <input type="checkbox" v-model="publicValues" 
        :id="checkbox.id" 
        :value="checkbox.value" 
        :disabled="checkbox.disabled || disabled"
        :aria-checked="checkbox.checked"
        :aria-labelledby="groupId + ` label-${checkbox.id}`"
        @change="toggleCheckbox(checkbox)"
      />
      <label :id="`label-${checkbox.id}`" :for="checkbox.id">
        {{ checkbox.value }}
      </label>
    </template>
  </div>
  <div v-else>
    <template v-for="checkbox in checkboxes">
      <input type="checkbox" v-model="publicValues" 
        :id="checkbox.id" 
        :value="checkbox.value" 
        :disabled="checkbox.disabled || disabled"
        :aria-checked="checkbox.checked"
        :aria-labelledby="`label-${checkbox.id}`"
        @change="toggleCheckbox(checkbox)"
      />
      <label :id="`label-${checkbox.id}`" :for="checkbox.id">
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
      validator (value) {
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
  created () {
    //Set the default checked checkboxes
    this.checkboxes.forEach((checkbox) => {
      if (checkbox.checked)
        this.values.push(checkbox.value)
    })
  },
  data () {
    return {
      values: []
    }
  },
  computed: {
    //Wrapper around values so it is propegated through v-model, or 'public' as I've dubbed it
    publicValues: {
      get () {
        return this.values
      },
      set (value) {
        this.values = value
        this.$emit('input', this.values)
      }
    }
  },
  methods: {
    toggleCheckbox (checkbox) {
      //Checkbox is checked, set aria-checked
      if (this.values.indexOf(checkbox.value) > -1)
        checkbox.checked = true
      //Checkbox not checked, unset aria-checked
      else
        checkbox.checked = false
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
