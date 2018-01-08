<template>
  <header>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'b-header'
}
</script>

<style scoped>
header {
  background-color: rgb(248,248,248);
  display: flex;
  flex: 0 0 3rem;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  padding: 0rem 2rem;
}
</style>
