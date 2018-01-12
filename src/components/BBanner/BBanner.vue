<template>
  <header role="banner" :class="classes">
    <slot></slot>
  </header>
</template>

<script>
import BNav from '../BNav'

export default {
  name: 'b-banner',
  props: {
    primary: Boolean,
    secondary: Boolean,
    tirtiary: Boolean
  },
  computed: {
    classes () {
      return {
        'b-banner': true,
        'primary': this.primary,
        'secondary': this.secondary,
        'tirtiary': this.tirtiary
      }
    }
  },
  mounted () {
    if (this.$el.parentElement !== document.body)
      console.error('Parent element for <b-name> must be body.')
  }
}
</script>

<style lang="stylus">
  header
    &.b-banner
      width 100%
      padding 10px
      a
        text-decoration none
        color #fff
      span
        &.b-banner-title
          a
            font-size 36px
            font-weight 600
      &.primary
        background-color #000
      &.secondary
        background-color #fff
        span.b-banner-title
          a
            color #000
        nav.b-nav
          a.b-nav-item
            color #000
      &.tirtiary
        background-color tomato
</style>
