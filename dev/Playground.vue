<template>
  <div>
    <b-radio v-bind="radioGroup1" />
    <br />
    <b-radio v-bind="radioGroup2" />
    <br />
    <b-radio v-bind="radioGroup3" />
    <br />
    <b-radio v-bind="radioGroup4" />
  </div>
</template>

<script>
  import BRadio from '../src/components/BRadio'

  export default {
    components: {
      BRadio
    },
    data: () => ({
      radioGroup1: {
        radios: [{id: 'radio-1', value: 'Center Back', disabled: true}, {id: 'radio-2', value: 'Center Front'}, {id: 'radio-3', value: 'Front Back'}],
        groupId: 'radio-group1',
        groupLabel: 'My radios:',
        showGroupLabel: true
      },
      radioGroup2: {
        radios: [{id: 'radio-4', value: 'Center Back'}, {id: 'radio-5', value: 'Center Front', checked: true}, {id: 'radio-6', value: 'Front Back'}],
        groupId: 'radio-group2',
        groupLabel: 'My radios:',
        showGroupLabel: true
      },
      radioGroup3: {
        radios: [{id: 'radio-7', value: 'Center Back'}, {id: 'radio-8', value: 'Center Front'}, {id: 'radio-9', value: 'Front Back'}],
        groupId: 'radio-group3',
        groupLabel: 'My radios:',
        showGroupLabel: true
      },
      radioGroup4: {
        radios: [{id: 'radio-10', value: 'Center Back'}, {id: 'radio-11', value: 'Center Front', checked: true}, {id: 'radio-12', value: 'Front Back'}],
        groupId: 'radio-group4',
        groupLabel: 'My radios:',
        showGroupLabel: true,
        disabled: true
      }
    })
  }
</script>
