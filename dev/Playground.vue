<template>
  <div style="width: 50%">
    <BSelect
            v-bind:selectOptions=options
            v-bind:isRequired=true
            selectLabel="Select Test"
        />
  </div>
</template>

<script>
  import BSelect from '../src/components/BSelect/BSelect.vue'

  const options = [{id: 1, text: 'I'}, {id: 2, text: 'Love'}, {id: 3, text: 'css'}]

  export default {
    components: {
      BSelect
    },
  data () {
    return {
      options: options,
    }
  }
}
</script>
