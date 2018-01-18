<template>
  <section role="contentinfo" :aria-label="label">
    <div>
      <span
        :class="{ 'caret': true, 'caret-down': expanded}"
        v-if="expandable"
        @click="toggleCaret"
      >
      </span>
      <component v-if=!hideLabel :is=headerElement() class="header">{{ label }}</component>
      <slot name="icon" class="icon"></slot>
    </div>
    <transition name="fade">
      <div class="bordered" v-if="expanded">
        <slot></slot>
      </div>
    </transition>
  </section>
</template>

<script>
  /**
  * Buoy Container Component
  */
export default {
  name: 'b-container',
  props: {
    /**
    * Label text.  Will be used in display label and aria-label.
    */
    label: {
      type: String,
      required: true
    },
    /**
    * Display label importance.  Valid values are 1-6.  Will generate h1-h6 elements.
    */
    headerLevel: {
      type: [String, Number]
    },
    /**
    * Used to hide the display label.  Label prop will still be used for aria-label.
    */
    hideLabel: {
      type: Boolean
    },
    expandable: {
      type: Boolean
    }
  },
  created: function() {
    if (this.hideLabel) {
      return
    }
    if (typeof this.headerLevel === "undefined") {
      console.warn ('No headerLevel property set, defaulting to 2')
    } else if (isNaN(this.headerLevel) || this.headerLevel < 1 || this.headerLevel > 6) {
      console.error('Invalid headerLevel property set. Valid input are numbers 1-6.  Reverting to default level 2.')
    }
  },
  
  data: function() {
    return {
      headerElement: () => {
        if (isNaN(this.headerLevel) || this.headerLevel < 1 || this.headerLevel > 6) {
          return `h2`
        } else {
          return `h${this.headerLevel}`
        }
      },
      expanded: true
    }
  },

  methods: {
    toggleCaret () {
      this.caretToggle = !this.caretToggle
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped>
  .bordered {
    flex-grow: 1;
    border:1px solid rgb(217,217,217);
    border-radius: 0.1875rem;
    margin: 0.125rem 0.3125rem;
    padding: 0.625rem;
  }
  .caret {
    width: 0; 
    height: 0; 
    border-top: .4rem solid transparent;
    border-bottom: .4rem solid transparent;
    border-left: .4rem solid blue;
    margin-left: .4rem;
    margin-right: .5rem;
    margin-bottom: .2rem;
    transition: all .3s;
  }
  .caret-down {
    transition: all .3s;
    transform: rotate(90deg);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .header {
    margin: 0.125rem 0.3125rem;
    flex-grow: 1
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
<b-container class="edit_me" label="Container Header" headerLevel="3" expandable>
  <span slot="icon">&#10004;</span>
  <b-button>Test</b-button>
  <b-button>Test2</b-button> 
</b-container>
```

</docs>