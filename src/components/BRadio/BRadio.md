Example Radio Object

Radios prop is an array of Radio Objects.

| Key      | Required/Optional | Default | Description                              |
| -------- | ----------------- | ------- | ---------------------------------------- |
| id       | Required          |         | Needs to be unique in the radio group. Returned if radio button is selected.  |
| value    | Required          |         | Label for radio button. |
| disabled | Optional          | false   | Disables radio button.                   |

Radio Button Options

```js

const radios = [
  {id: 1, value:"Option" },
  {id: 2, value:"Selected" },
  {id: 3, value:"Disabled", disabled: true }
]

const radioCheckedId1 = 2

<b-radio group-id="1" group-label="Radio Options" :radios="radios" v-model="radioCheckedId1"/>

```

Disabled Radio Group

```js

const radios2 = [
  {id: 1, value:"Option" },
  {id: 2, value:"Selected" },
  {id: 3, value:"Disabled", disabled: true }
]

const radioCheckedId2 = 2

<b-radio disabled group-id="r2" group-label="Radio Options" :radios="radios2" v-model="radioCheckedId2"/>

```

Longer Label Name

```js

const radios3 = [
  {id: 1, value:"Option" },
  {id: 2, value:"Selected" },
  {id: 3, value:"Disabled", disabled: true }
]

const radioCheckedId3 = 2

<b-radio group-id="r3" group-label="This is an example of a really long group label." :radios="radios3" v-model="radioCheckedId3"/>

```

Validation

```js

const radios4 = [
  {id: 1, value:"Select Me" }
]

let isValidRadioGroup = false;

<b-validator v-model="isValidRadioGroup" scope="radio-group-4">
  <b-radio group-id="r4" group-label="Select to enable button" :radios="radios4" validation-name="radio" required />
  <b-button :disabled="!isValidRadioGroup">Submit</b-button>
</b-validator>

```