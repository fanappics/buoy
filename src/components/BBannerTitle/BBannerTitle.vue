<template>
  <span class="b-banner-title">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'b-banner-title',
  props: {
    primary: Boolean,
    secondary: Boolean,
    tirtiary: Boolean
  },
  computed: {
    classes () {
      return {
        'b-banner-title': true,
        'primary': this.primary,
        'secondary': this.secondary,
        'tirtiary': this.tirtiary
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  span
    &.b-banner-title
      a
        text-decoration none
        font-size 36px
        font-weight 600
        color #fff

  span
    &.b-banner-title
      &.secondary
        a
          color #000
</style>
