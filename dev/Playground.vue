<template>
  <b-validator scope="input-validator" v-model="isValid">
    <b-input id="1" label="Required Input" field-name="test" required />
    {{ isValid }}
  </b-validator>
</template>
        
<script>

  export default {
    components: {
    },
    data () {
      return {
        isValid: 'false'
      }
    }
  }
</script>
