<template>
<details>
  <summary>
    <span class="title">{{summary}}</span>
    <div class="icon">
      <slot name="icon"></slot>
    </div>
  </summary>
  <slot></slot>
</details>
</template>

<script>
export default {
  name: 'b-details',
  props: {
    summary: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.icon {
  float: right;
}
.title {
  font-weight: bold;
}
details[open] summary ~ * {
  animation: fadein 1s;
}
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

<docs>
```js
<b-details summary="The summary prop provides summary/title text.">
  <span slot="icon">&#10003;</span>
  <p>You can put your content into the default slot, and an optional icon into the named "icon" slot</p>
</b-details>
```
</docs>
