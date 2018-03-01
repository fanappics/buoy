Buoy Checkbox Component

### Single

```js
  const checkbox1 = {
    checkboxes:[{ id: 'checkbox-1', value: 'Sign up now' }]
  }
  <b-checkbox v-bind="checkbox1" />
```

### Multiple

```js
  const checkbox2 = {
    checkboxes:[
      { id: 'checkbox-2', value: 'Option #1' },
      { id: 'checkbox-3', value: 'Option #2' }
    ],
    groupId: 'checkbox-group-1',
    groupLabel: 'You must choose:'
  }
  <b-checkbox v-bind="checkbox2" />
```

### Required

```js
  const checkbox3 = {
    checkboxes:[
      { id: 'checkbox-4', value: 'Option #1' },
      { id: 'checkbox-5', value: 'Option #2' }
    ],
    groupId: 'checkbox-group-2',
    groupLabel: 'You must choose:'
  }
  <b-checkbox v-bind="checkbox3" required />
```

### Validation with BValidator

```js
  let checkboxGroupsValid = false;
  const checkbox4 = {
    checkboxes:[
      { id: 'checkbox-6', value: 'Winter' },
      { id: 'checkbox-7', value: 'Spring' },
      { id: 'checkbox-8', value: 'Summer' },
      { id: 'checkbox-9', value: 'Fall' }

    ],
    groupId: 'checkbox-group-3',
    groupLabel: 'I Love:'
  }

  let checked = ['checkbox-6'];
  <div>
    <b-validator scope="checkbox-group-validator" v-model="checkboxGroupsValid" >
      <b-checkbox v-bind="checkbox4" v-model="checked" required />
      <b-button :disabled="!checkboxGroupsValid" label="Submit"> />
    </b-validator>

   checked {{ checked }}
  </div>
```

### Disabled

```js
  const checkbox5 = {
    checkboxes:[
      { id: 'checkbox-10', value: 'Option #1' },
      { id: 'checkbox-11', value: 'Option #2' },
      { id: 'checkbox-12', value: 'Option #3' }
    ],
    groupId: 'checkbox-group-4',
    groupLabel: 'Select an option:'
  }
  let checked = ['checkbox-11'];
  <b-checkbox v-bind="checkbox5" disabled />
```
