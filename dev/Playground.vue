<template>
  <b-text-input
    id="Test"
    name="testName"
    label="This is a label"
    placeholder="This is a placeholder"
    required
    :rules="[rules.required]"
    hint="test"
    v-model="test"
    solo
    counter="25"
  ></b-text-input>
</template>

<script>
  export default {
    data: () => ({
      rules: {
        required: (value) => !!value || 'Required' 
      },
      test: ''
    })
  }
</script>
