```js

const options = [{id: 1, displayName: 'This'}, {id: 2, displayName: 'Is'}, {id: 3, displayName: 'An Example'}]

<div>
  <div style="width: 50%">
    <b-select
      :required=false
      :selectOptions="options"
      id="example-id"
      placeholder="Placeholder Example"
      selectLabel="Select Example"
    />
  </div>

  <div style="width: 50%">
    <b-select
      :required=true
      :selectOptions="options"
      id="example-id-2"
      placeholder="Placeholder Example"
      selectLabel="Required Select Example"
    />
  </div>

  <div style="width: 50%">
    <b-select
      :initialValue="{id: 3, displayName: 'An Example'}"
      :required=true
      :selectOptions="options"
      id="example-id-3"
      selectLabel="Pre Selected Example"
    />
  </div>
</div>
```