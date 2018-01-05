<template>
  <div>
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
  </div>
</template>

<script>
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
    })
  }
</script>
