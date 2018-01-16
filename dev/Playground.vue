<template>
  <div>
<<<<<<< HEAD
    <b-checkbox v-bind="checkbox" />
    <br />
    <b-checkbox v-bind="checkboxGroup1" />
    <br />
    <b-checkbox v-bind="checkboxGroup2" />
    <br />
    <b-checkbox v-bind="checkboxGroup3" />
    <br />
    <b-checkbox v-bind="checkboxGroup4" />
    <br />
    <b-checkbox v-bind="checkboxGroup5" />
=======
    <b-input id="input-1" label="My Input" placeholder="Type something here" />
    <br />
    <b-input id="input-2" type="currency" label="My Currency Input" />
    <br />
    <b-input id="input-3" label="My Required Input" required />
    <br />
    <b-input id="input-4" label="My Disabled Input" placeholder="Don't touch this" disabled />
    <br />
    <b-input id="input-5" type="currency" label="My Disabled Currency Input" placeholder="Don't touch this" disabled />
    <br />
    <b-input id="input-6" label="My Limited Input" placeholder="10 characters only" :minlength="4" :maxlength="10" required />
    <br />
    <b-input id="input-7" v-model="formData.value" label="My Default Value Input" />
    <br />
    <b-input id="input-8" v-model="formData.date" type="date" label="My Date Input" />
    <br />
    <b-input id="input-9" v-model="formData.password" type="password" label="My Password Input" required />
    <br />
    <b-input id="input-10" label="My Readonly Input" readonly value="3.14" />
    <br />
    <b-input id="input-11" label="My Focused Input" placeholder="Form starts here" autofocus />
    <br />
    <b-input id="input-12" v-model="formData.datetime" type="datetime-local" label="My DateTime Input" />
    <br />
    <b-input id="input-13" v-model="formData.number" type="number" label="My Number Input" :min="1" :max="100" />
    <br />
    <b-input id="input-14" label="My Regex Input (Digits Only)" pattern="^([0-9]+)$" />
    <br />
    <b-input id="input-15" v-model="formData.innerData.email" label="My Email Input" type="email" />
    <br />
    <BSelect
            v-bind:selectOptions=options
            v-bind:required=true
            id="testId"
            v-bind:placeholder=placeholder
            selectLabel="Select Test"
        />
>>>>>>> 6f14b79fc85e813b19adab2662ff596ef7cc9986
  </div>
</template>

<script>
<<<<<<< HEAD
  import BCheckbox from '../src/components/BCheckbox'
  export default {
    components: {
      BCheckbox
    },
    data: () => ({
      checkbox: {
        checkboxes: [{id: 'checkbox-1', value: 'Sign up now'}]
      },
      checkboxGroup1: {
        checkboxes: [{id: 'checkbox-2', value: 'Forward'}, {id: 'checkbox-3', value: 'Backward'}]
      },
      checkboxGroup2: {
        checkboxes: [{id: 'checkbox-4', value: 'Forward'}, {id: 'checkbox-5', value: 'Backward'}],
        groupId: 'checkbox-group',
        groupLabel: 'Direction:',
        showGroupLabel: true
      },
      checkboxGroup3: {
        checkboxes: [{id: 'checkbox-6', value: 'Forward', checked: true}, {id: 'checkbox-7', value: 'Backward'}],
        groupId: 'checkbox-group',
        groupLabel: 'Direction:',
        showGroupLabel: true
      },
      checkboxGroup4: {
        checkboxes: [{id: 'checkbox-8', value: 'Forward'}, {id: 'checkbox-9', value: 'Backward', disabled: true}],
        groupId: 'checkbox-group',
        groupLabel: 'Direction:',
        showGroupLabel: true
      },
      checkboxGroup5: {
        checkboxes: [{id: 'checkbox-10', value: 'Forward'}, {id: 'checkbox-11', value: 'Backward'}],
        groupId: 'checkbox-group',
        groupLabel: 'Direction:',
        showGroupLabel: true,
        disabled: true
      }
=======
  import BInput from '../src/components/BInput'
  import BSelect from '../src/components/BSelect/BSelect.vue'
  
  const options = [{id: 1, text: 'I'}, {id: 2, text: 'Love'}, {id: 3, text: 'css'}]
  const placeholder = "Placeholder Test"
  
  export default {
    components: {
      BInput,
      BSelect
    },
    data: () => ({
      formData: {
        date: '1776-07-04',
        datetime: '1970-01-01T00:00',
        number: '50',
        password: '',
        value: 'Fanatics',
        innerData: {
          email: 'test@fanatics'
        }
      },
      options: options,
      placeholder: placeholder
>>>>>>> 6f14b79fc85e813b19adab2662ff596ef7cc9986
    })
  }
</script>
