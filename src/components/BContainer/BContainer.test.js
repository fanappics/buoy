import { mount } from 'vue-test-utils'
import BContainer from './BContainer'

describe('BContainer', () => {
  it('renders correctly', () => {
    const label = 'hello world'
    const headerLevel = 1
    const wrapper = mount(BContainer, {
      propsData: { label, headerLevel }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it(`renders an element with no h element if hideLabel is passed`, () => {
    const label = 'hello world'
    const hideLabel = true
    const wrapper = mount(BContainer, {
      propsData: { label, hideLabel }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it(`renders props.label in header element when passed.  Can specify header level with prop`, () => {
    const label = 'hello world'
    const headerLevel = 6
    const wrapper = mount(BContainer, {
      propsData: { label, headerLevel }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it(`Default to H2 if label is passed in without a headerLevel property.`, () => {
    console.warn = jest.fn()
    const label = 'hello world'
    const wrapper = mount(BContainer, { propsData: { label } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(console.warn).toHaveBeenCalled()
  })
  it(`Default to H2 if label is passed in with an invalid headerLevel property. Should log to console.error.`, () => {
    console.error = jest.fn()
    const label = 'hello world'
    const headerLevel = 'The Greatest Importance'
    const wrapper = mount(BContainer, { propsData: { label, headerLevel } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(console.error).toHaveBeenCalled()
  })
})
