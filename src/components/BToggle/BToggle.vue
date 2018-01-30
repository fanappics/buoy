<template>
  <button 
    :aria-pressed="state"
    :disabled="disabled" 
    :class="{'checked': state}"
    @click="onClick"
    type="button" 
  >
    <span class="slider"></span>
    {{ this.label }}
  </button>
</template>

<script>
export default {
  name: "b-toggle",
  props: {
    /**
    * The toggle ID.
    */
    id: {
      type: String,
      required: true
    },
    /**
    * Label to be used on the toggle.
    */
    label: {
      type: String,
      required: true
    },
    /**
    * Turns on and off Toggle.
    */
    disabled: Boolean,
    /**
    * The state/value of the toggle.
    */
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      state: this.value
    }
  },
  methods: {
  /**
   * toggles the checked prop.
   */
    onClick: function(event) {
      this.state = !this.state
      this.$emit("input", this.state)
    }
  }
}
</script>

<style scoped>  
  button {
    font-weight: 600;
    position: relative;
    padding-left: 2.15rem;
  }

  .slider:after {
    content: '';
    position: absolute;
    top: 1.05rem;
    left: .65rem;
    height: .75rem;
    width: .75rem;
    background-color: #adadad;
    border-radius: 50%;
  }
  
  .slider:before {
    content: '';
    position: absolute;
    top: 1.30rem;
    left: .755rem;
    width: 1.5rem;
    height: .25rem;
    background-color: #dededf;
    border-radius: 1rem;
  }

  .slider {
    margin-right: .625rem;
  }
  
  button.checked .slider:after {
    background-color: #00aaed;
    transform: translateX(.85rem);
  }
</style>
