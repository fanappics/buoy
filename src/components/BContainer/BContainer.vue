<template>
  <section>
    <h1 v-if="label">{{ label }}</h1>
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'b-container',
  props: {
    label: {
      type: String    
    }
  }
}
</script>

<style scoped>
  h1 {
    margin: 2px 5px;
  }
  div {
    border:1px solid rgb(217,217,217);
    border-radius: 3px;
    margin: 2px 5px;
    padding: 10px;
  }
</style>
