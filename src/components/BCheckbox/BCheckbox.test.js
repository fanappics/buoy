import { createLocalVue, shallow } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import BCheckbox from './BCheckbox'

const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('Single checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{ id: 'checkbox', value: 'Checkbox' }]
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Single disabled checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{ id: 'checkbox', value: 'Checkbox', disabled: true }]
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Single checked checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{ id: 'checkbox', value: 'Checkbox' }],
        value: ['checkbox']
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple checkbox with group label', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{ id: 'checkbox-1', value: 'Checkbox', disabled: true }, { id: 'checkbox-2', value: 'Checkbox2' }],
        groupId: 'checkbox-group',
        groupLabel: 'Checkbox Group',
        showGroupLabel: true,
        value: ['checkbox-2']
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
