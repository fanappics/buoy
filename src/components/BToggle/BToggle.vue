<template>

  <div>
    <label class="toggle">
      <input type="checkbox">

      <span class="slider">{{this.label}}</span>
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

  .toggle {
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding-left: 100px;
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
    top: 50;
    left: 0;
    height: 1rem;
    width: 1rem;
    background-color: #adadad;
    border-radius: 50%;
  }
  
  .slider:before {
    content: '';
    position: absolute;
    top: 16px;
    left: 0;
    width: 80px;
    height: 8px;
    background-color: #adadad;
    border-radius: 10px;
  }
  
  input:checked + .slider:after {
    background-color: #419bf9;
    transform: translateX(2.5rem);
  }
  
  input:checked + .slider:before {
    background-color: #419bf9;
  }
  
  input:disabled + .slider:after,
  input:disabled + .slider:before {
    background-color: #e5e5e5;
  }

</style>
