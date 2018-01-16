```js

const options = [{id: 1, displayName: 'This'}, {id: 2, displayName: 'Is'}, {id: 3, displayName: 'An Example'}]
const selected = {id: 3, displayName: 'An Example'}

<div>
  <div style="width: 50%">
    <b-select
      :selectOptions="options"
      id="example-id"
      placeholder="Placeholder Example"
      selectLabel="Select Example"
    />
  </div>

  <div style="width: 50%">
    <b-select
      :selectOptions="options"
      id="example-id-2"
      placeholder="Placeholder Example"
      required
      selectLabel="Required Select Example"
    />
  </div>

  <div style="width: 50%">
    <b-select
      :selectOptions="options"
      v-model="selected"
      id="example-id-3"
      required
      selectLabel="Pre Selected Example"
    />
  </div>
</div>
```