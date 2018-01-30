<template>
  <div>
    <b-validator scope="root" v-model="rootValid">
      <b-validator scope="scope" v-model="valid">
        <b-checkbox v-bind="checkbox" required/>
        <br />
        <b-checkbox v-bind="checkboxGroup1" required/>
        <br />
        {{ valid }}
      </b-validator>

      <b-validator scope="scope2" v-model="valid2">
        <b-checkbox v-bind="checkbox2" required/>
        <br />
        <b-checkbox v-bind="checkboxGroup2" required/>
        <br />
        {{ valid2 }}
      </b-validator>

      <button :disabled="!rootValid">Submit</button>
    </b-validator>
  </div>
</template>
        
<script>
  import BCheckbox from '../src/components/BCheckbox'
  import BValidator from '../src/components/BValidator'

  export default {
    components: {
      BCheckbox,
      BValidator
    },
    data: () => ({
      checkbox: {
        checkboxes: [{id: 'checkbox-1', value: 'Sign up now'}]
      },
      checkboxGroup1: {
        checkboxes: [{id: 'checkbox-2', value: 'Forward'}, {id: 'checkbox-3', value: 'Backward'}],
        groupId: 'checkbox-group',
        groupLabel: 'Direction:'
      },
      checkbox2: {
        checkboxes: [{id: 'checkbox-4', value: 'Sign up now'}]
      },
      checkboxGroup2: {
        checkboxes: [{id: 'checkbox-5', value: 'Forward'}, {id: 'checkbox-6', value: 'Backward'}],
        groupId: 'checkbox-group',
        groupLabel: 'Direction:'
      },
      valid: false,
      valid2: false,
      rootValid: false
    })
  }
</script>
