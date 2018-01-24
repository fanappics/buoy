<template>
  <div>
    <b-validator scope="input-validator" v-model="valid">
      <b-input type="text" id="input-1" label="Required Input #1" placeholder="Type something" required />
      <br />
      <b-input type="text" id="input-2" label="Required Input #2" required />
      <br />
      <b-button :disabled="!valid">Submit</b-button>
    </b-validator>
    <br />
    <b-input id="input-3" type="currency" label="Currency Input" required validation-name="currency" />
    <br />
    <b-input id="input-4" type="currency" label="Currency Input" disabled />
    <br />
    <b-textarea id="textarea-1" name="textarea-1" label="Textarea" placeholder="Type something please" resizable />
    <br />
    <b-textarea id="textarea-2" name="textarea-2" label="Textarea" :rows="10" :cols="50" disabled />
    <br />
    <b-select id="select-1" select-label="Selector" :select-options="[{id:'1',displayName:'Yes'},{id:'2',displayName:'No'},{id:'3',displayName:'Maybe'}]" required />
    <br />
    <b-toggle id="toggle-1" label="Center Back" v-model="checked"></b-toggle>
  </div>
</template>
        
<script>

  export default {
    components: {
    },
    data () {
      return {
        valid: false,
        checked: true
      }
    }
  }
</script>
