<template>
  <section class="acc-flex-column">
    <div role="heading" class="acc-flex-center">
      <button
        :id="id"
        class="acc-header"
        :aria-expanded="expanded"
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
        <span :class="{ 'acc-arrow': true, 'ion-arrow-down-b': expanded, 'ion-arrow-up-b': !expanded }" />
      </button>
    </div>
    <transition name="fade">
      <div
        v-show="expanded"
        :id="`${id}-content`"
        class="acc-bordered acc-flex-center"
        role="region"
        :aria-labelledby="id"
      >
        <slot />
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
    label: {
      type: String,
      required: true
    },
    // Optional props
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

<style scoped>
  .acc-bordered {
    flex-grow: 1;
    border-color: #C4C3C4;
    border-style: solid none none none;
    border-width: 1px;
    padding: 0.625rem;
  }
  .acc-arrow {
    float: right;
    font-size: 1.29rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .acc-flex-center {
    display: flex;
    align-items: center
  }
  .acc-flex-column {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .acc-header {
    padding: 0;
    flex-grow: 1;
    border-width: 0px;
    font-size: 1rem;
    line-height: 20px;
    text-align: left;
    background-color: #FFFFFF;
    margin-bottom: .5rem;
  }
</style>
