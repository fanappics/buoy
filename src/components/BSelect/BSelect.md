```js

const options = [{id: 1, displayText: 'This'}, {id: 2, displayText: 'Is'}, {id: 3, displayText: 'An Example'}]
const selected1 = null
const selected2 = null
const selected3 = 3

<div>
  <div style="width: 50%">
    <b-select
      :selectOptions="options"
      id="example-id"
      placeholder="Placeholder Example"
      selectLabel="Select Example"
      v-model="selected1"
    />
  </div>

  <div>
    <p>Selected: {{ selected1 }}</p>
  </div>
  
  <div style="width: 50%">
    <b-select
      :selectOptions="options"
      id="example-id-2"
      placeholder="Placeholder Example"
      required
      selectLabel="Required Select Example"
      v-model="selected2"
    />
  </div>

  <div>
    <p>Selected: {{ selected2 }}</p>
  </div>
  
  <div style="width: 50%">
    <b-select
      :selectOptions="options"
      id="example-id-3"
      required
      selectLabel="Pre Selected Example"
      v-model="selected3"
    />
  </div>

  <div>
    <p>Selected: {{ selected3 }}</p>
  </div>

</div>
```