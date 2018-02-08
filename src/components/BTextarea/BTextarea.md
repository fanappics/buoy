### Example usage

```js
<b-textarea
  id="bta1"
  label="Default Label"
  placeholder="Default Placeholder">
    Default Example Usage
  </b-textarea>
```

### Resizable

```js
<b-textarea
  id="bta2"
  label="Default Label"
  placeholder="Default Placeholder"
  resizable>
    Default Example Usage
  </b-textarea>
```

### Disabled

```js
<b-textarea
  id="bta3"
  label="Default Label"
  placeholder="Default Placeholder"
  resizable
  disabled>
    Default Example Usage
  </b-textarea>
```

### Rows

```js
<b-textarea
  id="bta4"
  label="Default Label"
  placeholder="Default Placeholder">
    Default Example Usage
  </b-textarea>
```

### Validation

```js
<b-textarea
  id="bta5"
  label="Default Label"
  placeholder="Default Placeholder"
  validation-name="text area"
  required>
    Default Example Usage
  </b-textarea>
```

### Validation with BValidator

```js
  let textAreasValid = false;

  <b-validator scope="textarea-validator" v-model="textAreasValid">
    <b-textarea
      id="bta6"
      label="Default Label 1"
      placeholder="Default Placeholder 1"
      validation-name="textarea1"
      max-length="5">
        First Required Textarea
    </b-textarea>

    <b-textarea
      id="bta7"
      label="Default Label 2"
      placeholder="Default Placeholder 2"
      validation-name="textarea2"
      min-length="5"
      required>
        Second Required Textarea
    </b-textarea>

    <b-button :disabled="!textAreasValid">Submit</b-button>
  </b-validator>
```
