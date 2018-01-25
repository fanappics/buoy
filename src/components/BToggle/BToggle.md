```js

const toggleValue1 = false
const toggleValue2 = true


<div>
  <div>
    <b-toggle label="Test Toggle" id="test-id" v-model="toggleValue1">
    </b-toggle>
    Current Value: {{toggleValue1}}
  </div>
  <div>
    <b-toggle label="Test Toggle" id="test-id" v-model="toggleValue2">
    </b-toggle>
    Current Value: {{toggleValue2}}
  </div>
</div>
```