<template>
  <div>
    <b-container label="test-default-h2">
        <button>Test</button>
        <button>Test2</button> 
    </b-container>
    <b-container label="test-h3" headerLevel="3">
        <button>Test</button>
        <button>Test2</button> 
    </b-container>
    <b-container label="test-h3-hidelabel" headerLevel="3" hideLabel>
        <button>Test</button>
        <button>Test2</button> 
    </b-container>
    <b-container label="test-h3-hidelabel" headerLevel="6">
        <button>Test</button>
        <button>Test2</button> 
    </b-container>
    <b-container label="test-error" headerLevel="the greatest header">
        <button>Test</button>
        <button>Test2</button> 
    </b-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
    })
  }
</script>
