Wrapper to handle validation of a group of buoy components.

```js
  let isValid = false;

  <b-validator scope="input-validator" v-model="isValid">
    <b-input type="text" id="1" label="Required Input #1" required />
    <b-input type="text" id="2" label="Required Input #2" required />
    <div v-if="!isValid">
      Both fields are required
    </div>
  </b-validator>
```