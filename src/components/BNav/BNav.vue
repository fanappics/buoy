<template>
  <nav :class="classes">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'b-nav',
  props: {
    horizontal: Boolean,
    vertical: Boolean
  },
  created () {
    return this.horizontal && this.vertical && console.error('Navigation set to both horizontal and vertical.')
  },
  computed: {
    classes () {
      return {
        'b-nav': true,
        'b-horizontal-nav': this.horizontal || (!this.horizontal && !this.vertical),
        'b-vertical-nav': this.vertical
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  nav
    display flex
    &.b-horizontal-nav
      display inline-block
      flex-direction row
    &.b-vertical-nav
      flex-direction column
</style>
