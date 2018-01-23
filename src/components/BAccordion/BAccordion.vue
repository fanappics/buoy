<template>
  <section :id="id">
    <button
      :id="`${_uid}-heading`"
      class="header"
      :aria-expanded="expanded"
      :aria-controls="`${_uid}-content`"
      aria-disabled="true"
      role="heading"
      type="button"
      tabindex="0"
      @click="toggleExpansion"
      @keydown.enter.prevent
      @keyup.enter.prevent="toggleExpansion"
      @keydown.space.prevent
      @keyup.space.prevent="toggleExpansion"
    >
      {{ label }}
      <span
        :class="{
          chevron: true,
          'ion-chevron-down': expanded,
          'ion-chevron-up': !expanded
        }"
      >
      </span>
    </button>
    <transition name="fade">
      <div
        v-if="expanded"
        :id="`${_uid}-content`"
        class="bordered"
        role="region"
        :aria-labelledby="`${_uid}-heading`"
      >
        <slot></slot>
      </div>
    </transition>
  </section>
</template>

<script>
import events from '../../event-bus'

export default {
  name: 'b-accordion',
  props: {
    id: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  },

  created () {
    events.$on(`collaps-${this.id}`, this.collapse)
    events.$on('collapse', this.collapse)
    events.$on('expand', this.expand)
    events.$on(`expand-${this.id}`, this.expand)
  },

  beforeDestroy () {
    events.$off(`collaps-${this.id}`, this.collapse)
    events.$off('collapse', this.collapse)
    events.$off('expand', this.expand)
    events.$off(`expand-${this.id}`, this.expand)
  },

  data: function() {
    return {
      expanded: true
    }
  },

  methods: {
    toggleExpansion () {
      this.expanded = !this.expanded
    },
    collapse () {
      if (this.expandable) {
        this.expanded = false
      }
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
  .chevron {
    float: right;
  }
  .bordered {
    flex-grow: 1;
    border:1px solid rgb(217,217,217);
    border-radius: 0.1875rem;
    padding: 0.625rem;
  }
  .button-surround {
    border-width: 1px;
    border-color: gray;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .header {
    padding: 0;
    flex-grow: 1
  }
  button {
    border-width: 0px;
    font-size: 1rem;
    line-height: 20px;
    text-align: left;
    background-color: white;
    margin-bottom: .5rem;
  }
  div {
    display: flex;
    align-items: center
  }
  section {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>

<docs>
```js
<b-accordion
  class="edit_me"
  label="Accordion Header"
>
  <p>Whatever content you want to put in</p>
</b-accordion>
```

</docs>