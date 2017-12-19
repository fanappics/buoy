<template>
  <select>
    <option
        v-for="item in dataList"
        v-bind:option='item'
        v-bind:key='item.id'
    >
    </option>
  </select>
</template>

<script>
export default {
  name: 'select',
  props: [
    'option'
  ],
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
