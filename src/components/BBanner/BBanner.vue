<template>
  <header role="banner">
    <!-- <b-nav></b-nav> -->
    <slot name="nav"></slot>
  </header>
</template>

<script>
import BNav from '../BNav'

export default {
  name: 'b-banner',
  component: [BNav],
  props: {

  },
  mounted () {
    if (this.$el.parentElement !== document.body)
      console.error('Parent element for <b-name> must be body.')
  }
}
</script>

<style lang="stylus" scoped>

</style>
