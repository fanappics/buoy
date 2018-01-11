<template>
  <section role="contentinfo" :aria-label="label">
    <component v-if=!hideLabel :is=headerElement() class="header">{{ label }}</component>
    <div>
      <slot></slot>
    </div>
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
    }
  },
  created: function() {
    if (typeof this.headerLevel === "undefined") {
      console.warn ('No headerLevel property set, defaulting to 2')
    }
    if (isNaN(this.headerLevel) || this.headerLevel < 1 || this.headerLevel > 6) {
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
      }
    }
  }
}
</script>

<style scoped>
  .header {
    margin: 0.125rem 0.3125rem;
  }
  div {
    display: flex;
    flex-grow: 1;
    border:1px solid rgb(217,217,217);
    border-radius: 0.1875rem;
    margin: 0.125rem 0.3125rem;
    padding: 0.625rem;
  }
  section {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
<docs>
```js
<b-container class="edit_me" label="Container Header" headerLevel="3">
  <b-button>Test</b-button>
  <b-button>Test2</b-button> 
</b-container>
```

</docs>