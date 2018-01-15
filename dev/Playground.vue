<template>
  <div>
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
  </div>
</template>

<script>
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
    })
  }
</script>
