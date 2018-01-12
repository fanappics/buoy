<template>

  <div class="toggle-container">
    <label class="toggle">
      <input type="checkbox">

      <span class="slider"><label>{{this.label}}</label></span>
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
    left: 0;
    height: .75rem;
    width: .75rem;
    background-color: #adadad;
    border-radius: 50%;
  }
  
  .slider:before {
    content: '';
    position: absolute;
    top: 1.15rem;
    left: 0;
    width: 1.5rem;
    height: .25rem;
    background-color: #adadad;
    border-radius: 1rem;
  }
  
  input:checked + .slider:after {
    background-color: #419bf9;
    transform: translateX(.75rem);
  }
  
  input:checked + .slider:before {
    background-color: #419bf9;
  }
  
  input:disabled + .slider:after,
  input:disabled + .slider:before {
    background-color: #e5e5e5;
  }

</style>
