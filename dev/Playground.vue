<template>
  <div>
    <b-validator scope="input-validator" v-model="isValid">
      <b-input type="text" id="1" label="Required Input #1" required />
      <b-input type="text" id="2" label="Required Input #2" required />
    </b-validator>

    {{ isValid }}
  </div>
</template>
        
<script>

  export default {
    components: {
    },
    data () {
      return {
        isValid: false
      }
    }
  }
</script>
