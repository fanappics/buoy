<template>
  <a class="b-nav-item">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'b-nav-item',
  props: {

  }
}
</script>

<style lang="stylus" scoped>
  a.b-nav-item
    padding 5px
    border-radius 2px
    text-decoration none
    color tomato
    &:hover
      background-color rgba(133, 133, 133, 0.2)
</style>
