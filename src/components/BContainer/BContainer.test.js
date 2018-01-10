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
  it(`renders without a label being passed. Should find no H1 element.`, () => {
    const wrapper = mount(BContainer)
    expect(wrapper.findAll('h1').length).toBe(0)
  })
  it(`renders props.label in header element when passed.  Can specify header level with prop`, () => {
    const label = 'hello world'
    const headerLevel = 6
    const wrapper = mount(BContainer, {
      propsData: { label, headerLevel }
    })
    expect(wrapper.find('h6').text()).toBe(label)
  })
  it(`Default to H2 if label is passed in without a headerLevel property.`, () => {
    const label = 'hello world'
    const wrapper = mount(BContainer, { propsData: { label } })
    expect(wrapper.find('h2').text()).toBe(label)
  })
})
