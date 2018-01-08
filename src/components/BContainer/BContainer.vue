<template>
  <section>
    <component :is=headerElement class="header" v-if="label">{{ label }}</component>
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
      type: String    
    },
    level: {
      type: [String, Number],
      default: 1,
      validator: function(value) {
        value = Number(value)
        if (isNaN(value) || value < 1 || value > 6) {
          throw new Error("Invalid header level")
        }

        return true
      }
    }
  },
  data: function() {
    return {
      headerElement: `h${this.level}`
    }
  }
}
</script>

<style scoped>
  .header {
    margin: 0.125rem 0.3125rem;
  }
  div {
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
