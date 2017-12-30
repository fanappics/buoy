<template>
  <b-text-input
    id="test"
    name="testName"
    label="This is a label"
    placeholder="This is a placeholder"
    required
    type="currency"
    :rules="[rules.required]"
  ></b-text-input>
</template>

<script>
  export default {
    data: () => ({
      rules: {
        required: (value) => !!value || 'Required' 
      }
    })
  }
</script>
