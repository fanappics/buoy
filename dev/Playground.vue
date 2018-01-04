<template>
  <div style="width: 50%">
    <BSelect
            v-bind:selectOptions=options
            v-bind:isRequired=true
            v-bind:placeholder=placeholder
            selectLabel="Select Test"
        />
  </div>
</template>

<script>
  import BSelect from '../src/components/BSelect/BSelect.vue'

  const options = [{id: 1, text: 'I'}, {id: 2, text: 'Love'}, {id: 3, text: 'css'}]
  const placeholder = "Placeholder Test"

  export default {
    components: {
      BSelect
    },
  data () {
    return {
      options: options,
      placeholder: placeholder,
    }
  }
}
</script>
