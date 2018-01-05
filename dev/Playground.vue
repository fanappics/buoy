<template>
  <div>
    <b-textarea
      id="Test"
      label="This is a label"
      placeholder="This is a placeholder"
      required
      disabled
      v-model="test"
    ></b-textarea>
    <span>{{ test }}</span>
  </div>
</template>

<script>
  export default {
    data: () => ({
      test: ''
    })
  }
</script>
