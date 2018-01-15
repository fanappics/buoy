<template>
  <button 
    :aria-pressed="state"
    :disabled="disabled" 
    :class="{'checked': state}"
    @click="onClick"
    type="button" 
  >
    <span class="slider"></span>
      {{this.label}}
  </button>
</template>

<script>
export default {
  name: "b-toggle",
  props: {
    id:{
      type: String,
      required: true
    },
    label:{
      type: String,
      required: true
    },
    disabled:{
      type: Boolean,
      required: false
    },
    value:{
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
    border-style: solid;
    border-width: thin;
    border-radius: .25rem;
    border-color: #dededf;
    font-size: .8rem;
    font-weight: 600;
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding-left: 2rem;
    padding-right: 1.25rem;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .55rem;
  }

  .slider:after {
    content: '';
    position: absolute;
    top: .90rem;
    left: .5rem;
    height: .75rem;
    width: .75rem;
    background-color: #adadad;
    border-radius: 50%;
  }
  
  .slider:before {
    content: '';
    position: absolute;
    top: 1.15rem;
    left: .625rem;
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
  
  button:disabled .slider:after,
  button:disabled .slider:before {
    background-color: #e5e5e5;
  }

  :disabled {
    opacity: 0.4;
    color: #333333;
  }

</style>
