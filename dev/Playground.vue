<template>
  <div>
    <b-text-input
      id="Test"
      name="testName"
      label="This is a label"
      placeholder="This is a placeholder"
      required
      v-model="test"
    ></b-text-input>
    <span>{{ test }}</span>
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
