<template>
  <div :class="{ flex: !rows && !cols }">
    <label :for="id" :class="{ disabled: disabled }">
      {{ label }}<span v-if="required" aria-label="Required">*</span>
    </label>
    <textarea
      v-model="inputValue"
      v-bind="{id, name, cols, rows, placeholder, required, disabled}"
      :class="{ 'fixed-size': !resizable }"
    />
  </div> 
</template>

<script>
export default {
  name: 'b-textarea',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    cols: Number,
    rows: Number,
    placeholder: String,
    label: {
      type: String,
      required: true
    },
    required: Boolean,
    disabled: Boolean,
    resizable: Boolean
  },
  computed: {
    inputValue: {
      get () {},
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
}
.fixed-size {
  resize: none;
}
</style>
