<template>
  <select v-model='selected'>
    <option
        v-for="item in options"
        v-bind:option='item'
        v-bind:key='item.id'
    >
    </option>
  </select>
</template>

<script>
export default {
  name: 'b-select',
  props: [
    'option'
  ],
}
</script>

<style scoped>
</style>
