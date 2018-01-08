<template>
  <div style="width: 50%">
    <BSelect
            v-bind:selectOptions=options
            v-bind:isRequired=true
            id="testId"
            v-bind:placeholder=placeholder
            selectLabel="Select Test"
            v-bind:initialValue = initialValue
        />
  </div>
</template>

<script>
  import BSelect from '../src/components/BSelect/BSelect.vue'

  const options = [{id: 1, text: 'I'}, {id: 2, text: 'Love'}, {id: 3, text: 'css'}]
  const placeholder = "Placeholder Test"
  const initialValue = {id: 1, text: 'I'}

  export default {
    components: {
      BSelect
    },
  data () {
    return {
      options: options,
      placeholder: placeholder,
      initialValue: initialValue
    }
  }
}
</script>
