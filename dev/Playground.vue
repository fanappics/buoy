<template>
    <div>
      <b-shuttle 
      :options="options"
      availableLabel="Available Options"
      chosenLabel="Chosen Options"
      v-model="shuttle"
      placeholder="Placeholder Text"
      />
    </div>

</template>
        
<script>

  const selected = null
  const options = [
    {id: 1, displayText: "Ralph"}, 
    {id: 20, displayText: "Bob"}, 
    {id: 2, displayText: "Hplar"}, 
    {id: 25, displayText: "derp"}, 
    {id: 200, displayText: "Meh"}, 
    {id: 300, displayText: "a"}, 
    {id: 350, displayText: "b"}, 
    {id: 100, displayText: "c"}, 
    {id: 5300, displayText: "d"}, 
    {id: 123, displayText: "e"}, 
    {id: 4, displayText: "f"}, 
    {id: 512, displayText: "g"}, 
    {id: 31, displayText: "h"}, 
    ]

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
