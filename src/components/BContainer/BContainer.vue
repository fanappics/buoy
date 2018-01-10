<template>
  <section role="contentinfo" :aria-label="label">
    <component v-if=!hideLabel :is=headerElement() class="header">{{ label }}</component>
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'b-container',
  props: {
    label: {
      type: String,
      required: true
    },
    headerLevel: {
      type: [String, Number]
    },
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
