<template>
    <div>
      <b-shuttle 
      :options="options"
      v-model="shuttle"
      placeholder="Placeholder Text"
      />
    </div>

</template>
        
<script>

  const selected = null
  const options = [{id: 1, displayText: "Ralph"}, {id: 2, displayText: "Bob"}, ]

  export default {
    components: {
    },
    data () {
      return {
        shuttle: null,
        options: options
      }
    }
  }
</script>
