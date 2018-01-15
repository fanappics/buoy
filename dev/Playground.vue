<template>
  <div>
    <b-toggle label="Test Toggle" id="test-id" v-model="toggleValue">
    </b-toggle>
  </div>
</template>

<script>
  export default {
    components: {
    },
  data () {
    return {
      toggleValue: true
    }
  }
}
</script>
