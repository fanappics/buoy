<template>
    <div style="width: 50%">
      <b-select
        :selectOptions="[{id: 1, text: 'This'}, {id: 2, text: 'Is'}, {id: 3, text: 'An Example'}]"
        :required=true
        id="example-id-3"
        v-model="selected"
        selectLabel="Select Example"
      />
    </div>
  </div>
</template>
        
<script>
  import BSelect from '../src/components/BSelect/BSelect.vue'

  const selected = {id: 3, text: 'An Example'}

  export default {
    components: {
      BSelect
    },
    data () {
      return {
        selected: selected
      }
    }
  }
</script>
