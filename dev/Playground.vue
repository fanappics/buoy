<template>
    <div style="width: 50%">
      <b-select
        :selectOptions="[{id: 1, displayName: 'This'}, {id: 2, displayName: 'Is'}, {id: 3, displayName: 'An Example'}]"
        id="example-id-3"
        v-model="selected"
        selectLabel="Select Example"
        required
      />
    </div>

</template>
        
<script>

  const selected = null

  export default {
    components: {
    },
    data () {
      return {
        selected: selected
      }
    }
  }
</script>
