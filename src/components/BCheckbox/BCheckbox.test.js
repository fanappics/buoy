import { shallow } from 'vue-test-utils'
import BCheckbox from './BCheckbox'

describe('Single checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{id: 'checkbox', value: 'Checkbox'}]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Single disabled checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{id: 'checkbox', value: 'Checkbox', disabled: true}]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Single checked checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{id: 'checkbox', value: 'Checkbox', checked: true}]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple checkbox', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{id: 'checkbox-1', value: 'Checkbox', checked: true}, {id: 'checkbox-2', value: 'Checkbox2', disabled: true}]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple checkbox with group label', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BCheckbox, {
      propsData: {
        checkboxes: [{id: 'checkbox-1', value: 'Checkbox', checked: true, disabled: true}, {id: 'checkbox-2', value: 'Checkbox2'}],
        groupId: 'checkbox-group',
        groupLabel: 'Checkbox Group',
        showGroupLabel: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
