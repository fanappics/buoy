<template>
    <div>
      <b-shuttle 
      :availableOptions="availableOptions"
      v-model="shuttle"
      placeholder="Placeholder Text"
      />
    </div>

</template>
        
<script>

  const selected = null
  const availableOptions = [{id: 1, displayText: "Ralph"}, {id: 2, displayText: "Bob"}, ]

  export default {
    components: {
    },
    data () {
      return {
        shuttle: null,
        availableOptions: availableOptions
      }
    }
  }
</script>
