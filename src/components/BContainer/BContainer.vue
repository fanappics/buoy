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
        return !!value && (value >= 0 && value <= 6)
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
    margin: 2px 5px;
  }
  div {
    border:1px solid rgb(217,217,217);
    border-radius: 3px;
    margin: 2px 5px;
    padding: 10px;
  }
  section {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
