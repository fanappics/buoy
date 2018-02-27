Example Radio Object

Radios prop is an array of Radio Objects.

| Key      | Required/Optional | Default | Description                              |
| -------- | ----------------- | ------- | ---------------------------------------- |
| id       | Required          |         | Needs to be unique in the radio group. Returned if radio button is selected.  |
| value    | Required          |         | Label for radio button. |
| disabled | Optional          | false   | Disables radio button.                   |

Radio Button Options

```js

const radios1 = [
  {id: "radio-1", value:"Option" },
  {id: "radio-2", value:"Selected" },
  {id: "radio-3", value:"Disabled", disabled: true }
]

const radioCheckedId1 = "radio-2"

<b-radio group-id="r1" group-label="Radio Options" :radios="radios1" v-model="radioCheckedId1"/>

```

Radio Button Options

```js

const radios2 = [
  {id: "radio-4", value:"Option" },
  {id: "radio-5", value:"Selected" },
  {id: "radio-6", value:"Disabled", disabled: true }
]

const radioCheckedId2 = "radio-5"

<b-radio group-id="r2" group-label="Radio Options Columm" :radios="radios2" v-model="radioCheckedId2" column/>

```

Disabled Radio Group

```js

const radios3 = [
  {id: "radio-7", value:"Option" },
  {id: "radio-8", value:"Selected" },
  {id: "radio-9", value:"Disabled", disabled: true }
]

const radioCheckedId3 = "radio-8"

<b-radio disabled group-id="r3" group-label="Radio Options" :radios="radios3" v-model="radioCheckedId3"/>

```

Longer Label Name

```js

const radios4 = [
  {id: "radio-10", value:"Option" },
  {id: "radio-11", value:"Selected" },
  {id: "radio-12", value:"Disabled", disabled: true }
]

const radioCheckedId4 = "radio-11"

<b-radio group-id="r4" group-label="This is an example of a really long group label." :radios="radios4" v-model="radioCheckedId4"/>

```

Validation

```js

const radios5 = [
  {id: "radio-13", value:"Select Me" }
]

let isValidRadioGroup = false;

<b-validator v-model="isValidRadioGroup" scope="radio-group-5">
  <b-radio group-id="r5" group-label="Select to enable button" :radios="radios5" validation-name="radio" required />
  <b-button :disabled="!isValidRadioGroup">Submit</b-button>
</b-validator>

```