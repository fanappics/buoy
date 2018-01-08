<template>
  <section>
    <span class="sides"></span>
    <span class="content">
      <slot></slot>
    </span>
    <span class="sides"></span>
  </section>
</template>

<script>
export default {
  name: 'b-section'
}
</script>

<style scoped>
section {
  background-color: rgb(248,248,248);
  display: flex;
  flex: 0 0 3rem;
}
span.sides {
  flex: 0 0 10%;
}
span.content {
  align-self: center;
  flex: 1;
  font-weight: bold;
}
</style>
