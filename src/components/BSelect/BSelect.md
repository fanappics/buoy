### Basic Example

```js
const selectOptions1 = [{id: 1, value: 'This'}, {id: 2, value: 'Is'}, {id: 3, value: 'An Example'}]
const selected1 = null

<div style="width: 50%">
  <b-select
    :options="selectOptions1"
    id="select-example-1"
    placeholder="Placeholder Example"
    label="Select Example"
    v-model="selected1"
  />
  <p>Selected: {{ selected1 }}</p>
</div>

```

### Required Select Example

```js
const selectOptions2 = [{id: 1, value: 'This'}, {id: 2, value: 'Is'}, {id: 3, value: 'An Example'}]
const selected2 = null

<div style="width: 50%">
  <b-select
    :options="selectOptions2"
    id="example-id-2"
    placeholder="Placeholder Example"
    required
    label="Required Select Example"
    v-model="selected2"
  />
  <p>Selected: {{ selected2 }}</p>
</div>

```

### Pre Selected Example

```js

const selectedOptions3 = [{id: 1, value: 'This'}, {id: 2, value: 'Is'}, {id: 3, value: 'An Example'}]
const selected3 = 3

<div style="width: 50%">
  <b-select
    :options="selectedOptions3"
    id="example-id-3"
    required
    label="Pre Selected Example"
    v-model="selected3"
  />
  <p>Selected: {{ selected3 }}</p>
</div>

```
### Validation with BValidator

```js
const selectOptions4 = [{id: 1, value: 'This'}, {id: 2, value: 'Is'}, {id: 3, value: 'An Example'}]
const selected4 = null

let selectValid = false;

<b-validator scope="textarea-validator" v-model="selectValid">
  <b-select
    :options="selectOptions4"
    id="example-id-4"
    placeholder="Placeholder Example"
    required
    label="Required Select Example"
    v-model="selected4"
  />
  {{ selected4 }}
  {{ selectValid }}
  <b-button :disabled="!selectValid" label="Submit" />
</b-validator>
```