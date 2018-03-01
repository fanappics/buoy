<template>
  <section class="b-accordion">
    <div role="heading" class="b-flex b-flex-center">
      <button
        :id="id"
        class="b-accordion-header"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-controls="`${id}-content`"
        type="button"
        tabindex="0"
        @click="toggleExpansion"
        @keydown.enter.prevent
        @keyup.enter.prevent="toggleExpansion"
        @keydown.space.prevent
        @keyup.space.prevent="toggleExpansion"
      >
        {{ label }}
        <span :class="{ 'b-arrow': true, 'ion-arrow-down-b': expanded, 'ion-arrow-up-b': !expanded }" />
      </button>
    </div>
    <transition name="b-fade">
      <div
        v-show="expanded"
        :id="`${id}-content`"
        class="b-accordion-content b-flex b-flex-center"
        role="region"
        :aria-labelledby="id"
      >
        <!-- @slot Use for accordion content -->
        <slot name="content"/>
      </div>
    </transition>
  </section>
</template>

<script>
import events from '../../event-bus'

export default {
  name: 'b-accordion',
  props: {
    // Required props
    /**
    * Label text.  Will be used in display label for accordion heading
    */
    label: {
      type: String,
      required: true
    },
    // Optional props
    /**
    * Initializes accordion collapsed when true.
    */
    collapsed: Boolean,
    id: {
      type: String,
      default () {
        return `accordion-${this._uid}`
      }
    }
  },

  created () {
    events.$on(`collapse-${this.id}`, this.collapse)
    events.$on('collapse', this.collapse)
    events.$on('expand', this.expand)
    events.$on(`expand-${this.id}`, this.expand)
  },

  beforeDestroy () {
    events.$off(`collapse-${this.id}`, this.collapse)
    events.$off('collapse', this.collapse)
    events.$off('expand', this.expand)
    events.$off(`expand-${this.id}`, this.expand)
  },

  data: function() {
    return {
      expanded: !this.collapsed
    }
  },

  methods: {
    toggleExpansion () {
      this.expanded = !this.expanded
    },
    collapse () {
      this.expanded = false
    },
    expand () {
      this.expanded = true
    }
  },

  inject: {
    parentScope: {
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/colors"

  .b-accordion
    display flex
    flex 1
    flex-direction column
    margin-bottom 1rem

  button.b-accordion-header
    background-color $accordion-background
    border none
    border-bottom 1px solid $accordion-border
    border-radius 0px
    flex-grow 1
    font-size 1rem
    font-weight 600
    line-height 1.5rem
    padding 0
    padding-bottom 0.5625rem
    text-align left
    &:active, &:focus, &:focus-within
      border-color $input-focus
      color $input-focus
      outline none
  
  .b-arrow
    float right
    font-size 1.5rem

  .b-accordion-content
    flex-grow 1
    padding-top 1.25rem

  .b-fade-enter-active, .b-fade-leave-active
    transition opacity .3s

  .b-fade-enter, .b-fade-leave-to
    opacity 0

</style>
