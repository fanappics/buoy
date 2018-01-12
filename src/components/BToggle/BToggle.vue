<template>

  <div class="toggle-container">
    <label class="toggle">
      <input type="checkbox" :disabled="disabled">

      <span class="slider"><label :class='labelClass'>{{this.label}}</label></span>
    </label>
  </div>
  
</template>

<script>
export default {
  name: 'b-toggle',
  props: {
    id:{
      type: String,
      required: true
    },
    label:{
      type: String,
      required: true
    },
    required:{
      type: Boolean,
      required: false
    },
    disabled:{
      type: Boolean,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {
    labelClass: function () {
      return {
        'disabled': this.disabled,
        'text': true
      }
    }
  }
}
</script>

<style scoped>

  .toggle-container {
  }  

  .toggle {
    border-style: solid;
    border-width: thin;
    border-radius: .25rem;
    border-color: #dededf;
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding-left: 2.25rem;
    height: 40px;
    line-height: 40px;
    margin: 5px;
  }

  .toggle input {
    display:none;
  }

  .slider:after {
    content: '';
    position: absolute;
    top: 35%;
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
    left: .5rem;
    width: 1.5rem;
    height: .25rem;
    background-color: #dededf;
    border-radius: 1rem;
  }

  .slider {
    margin: 1rem;
  }
  
  input:checked + .slider:after {
    background-color: #00aaed;
    transform: translateX(.75rem);
  }
  
  input:disabled + .slider:after,
  input:disabled + .slider:before {
    background-color: #e5e5e5;
  }

  label.text {
    font-weight: 600;
  }

  label.disabled {
    opacity: 0.4;
    color: ##333333;
  }

</style>
