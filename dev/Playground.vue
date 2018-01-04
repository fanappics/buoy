<template>
  <div style="width: 50%">
    <BSelect
            v-bind:selectOptions=options
            v-bind:isRequired=true
            selectLabel="two"
        />
  </div>
</template>

<script>
  import BSelect from '../src/components/BSelect/BSelect.vue'

  const options = [{id: 1, text: 'a'}, {id: 2, text: 'b'}, {id: 3, text: 'c'}]

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
