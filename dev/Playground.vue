<template>
  <div>
    <b-text-input
      id="Test"
      name="testName"
      label="This is a label"
      placeholder="This is a placeholder"
      required
      v-model="test"
      textarea
    ></b-text-input>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rules: {
        required: (value) => !!value || 'Required',
        test: (value) => !!value || 'Test'
      },
      test: ''
    })
  }
</script>
