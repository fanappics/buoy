### Example usage

```js
let text = 'My default message'

<b-textarea id="bta1" label="My Textarea" v-model="text" placeholder="You deleted my default message... :(" />
```

### Resizable

```js
<b-textarea id="bta2" label="MyTextarea" placeholder="Type something..." resizable />
```

### Disabled

```js
let text = 'My default message'

<b-textarea id="bta3" label="My Textarea" disabled />
```

### Rows

```js
let text = 'My default message...\n\ncontinuing on line 3.'

<b-textarea id="bta4" label="My Textarea" v-model="text" rows="3" />
```

### Validation

```js
<b-textarea id="bta5" label="My Textarea" placeholder="Type something to continue..." required />
```

### Validation with BValidator

```js
  let textAreasValid = false;

  <b-validator scope="textarea-validator" v-model="textAreasValid">
    <b-textarea id="bta6" label="Textarea 1" validation-name="textarea1" max-length="5" />
    <br />
    <b-textarea id="bta7" label="Textarea 2" validation-name="textarea2" min-length="5" required />
    <br />
    <b-button :disabled="!textAreasValid">Submit</b-button>
  </b-validator>
```
