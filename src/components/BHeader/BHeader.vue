<template>
  <header>
    <slot></slot>
  </header>
</template>

<script>
  /**
  * Buoy Header Component
  */
export default {
  name: 'b-header'
}
</script>

<style scoped>
header {
  background-color: rgb(248,248,248);
  display: flex;
  flex: 0 0 3rem;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  padding: 0rem 2rem;
}
</style>
<docs>
Sample documentation usage within `.vue` file

```js
<b-header class="edit_me">I’m a header!</b-header>
```

</docs>
