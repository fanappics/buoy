import { shallow } from 'vue-test-utils'
import BRadio from './BRadio'

describe('Single radio', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BRadio, {
      propsData: {
        radios: [{id: 'radio', value: 'Radio'}],
        groupId: 'radio-group',
        groupLabel: 'Radio Group',
        showGroupLabel: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple radio', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BRadio, {
      propsData: {
        radios: [{id: 'radio-1', value: 'Radio'}, {id: 'radio-2', value: 'Radio2'}],
        groupId: 'radio-group',
        groupLabel: 'Radio Group',
        showGroupLabel: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple radio with default', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BRadio, {
      propsData: {
        radios: [{id: 'radio-1', value: 'Radio', checked: true}, {id: 'radio-2', value: 'Radio2'}],
        groupId: 'radio-group',
        groupLabel: 'Radio Group',
        showGroupLabel: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple radio with disabled', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BRadio, {
      propsData: {
        radios: [{id: 'radio-1', value: 'Radio'}, {id: 'radio-2', value: 'Radio2', disabled: true}],
        groupId: 'radio-group',
        groupLabel: 'Radio Group',
        showGroupLabel: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Multiple radio with all disabled', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BRadio, {
      propsData: {
        radios: [{id: 'radio-1', value: 'Radio'}, {id: 'radio-2', value: 'Radio2'}],
        groupId: 'radio-group',
        groupLabel: 'Radio Group',
        showGroupLabel: true,
        disabled: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
