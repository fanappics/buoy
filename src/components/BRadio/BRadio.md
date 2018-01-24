Example Radio Object

Radios prop is an array of Radio Objects.

| Key      | Required/Optional | Default | Description                              |
| -------- | ----------------- | ------- | ---------------------------------------- |
| id       | Required          |         | Needs to be unique in the radio group.   |
| value    | Required          |         | Value that gets returned if button is selected. |
| checked  | Optional          | false   | Initial state for radio button is selected. |
| disabled | Optional          | false   | Disables radio button.                   |

Radio Button Options

```js

const radios = [
  {id: 1, value:"Option" },
  {id: 2, value:"Selected", checked: true },
  {id: 3, value:"Disabled", disabled: true }
]

<b-radio groupId="1" groupLabel="Radio Options" :radios="radios" />

```

Disabled Radio Group

```js

const radios2 = [
  {id: 1, value:"Option" },
  {id: 2, value:"Selected", checked: true },
  {id: 3, value:"Disabled", disabled: true }
]

<b-radio disabled groupId="2" groupLabel="Radio Options" :radios="radios2" />

```

Longer Label Name

```js

const radios3 = [
  {id: 1, value:"Option" },
  {id: 2, value:"Selected", checked: true },
  {id: 3, value:"Disabled", disabled: true }
]

<b-radio groupId="3" groupLabel="This is an example of a really long group label." :radios="radios3" />

```

Validation

```js

const radios4 = [
  {id: 1, value:"Select Me" }
]

let isValidRadioGroup = false;

<b-validator v-model="isValidRadioGroup" scope="radio-group-4">
  <b-radio groupId="4" groupLabel="Select to enable button" :radios="radios4" validationName="radio" required />
  <b-button :disabled="!isValidRadioGroup">Submit</b-button>
</b-validator>

```