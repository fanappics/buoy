```js

<div>
  <div style="width: 50%">
    <b-select
      :required=false
      :selectOptions="[{id: 1, text: 'This'}, {id: 2, text: 'Is'}, {id: 3, text: 'An Example'}]"
      id="example-id"
      placeholder="Placeholder Example"
      selectLabel="Select Example"
    />
  </div>

  <div style="width: 50%">
    <b-select
      :required=true
      :selectOptions="[{id: 1, text: 'This'}, {id: 2, text: 'Is'}, {id: 3, text: 'An Example'}]"
      id="example-id-2"
      placeholder="Placeholder Example"
      selectLabel="Required Select Example"
    />
  </div>

  <div style="width: 50%">
    <b-select
      :initialValue="{id: 3, text: 'An Example'}"
      :required=true
      :selectOptions="[{id: 1, text: 'This'}, {id: 2, text: 'Is'}, {id: 3, text: 'An Example'}]"
      id="example-id-3"
      selectLabel="Pre Selected Example"
    />
  </div>
</div>
```