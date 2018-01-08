import { mount } from 'vue-test-utils'
import BContainer from './BContainer'

describe('BContainer', () => {
  it('renders correctly', () => {
    const label = 'hello world'
    const wrapper = mount(BContainer, {
      propsData: { label }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it(`renders props.label in header element when passed.  Header element defaults to H1`, () => {
    const label = 'hello world'
    const wrapper = mount(BContainer, {
      propsData: { label }
    })
    expect(wrapper.find('h1').text()).toBe(label)
  })
  it(`shouldn't render a H1 element when no props.label is passed.`, () => {
    const wrapper = mount(BContainer)
    expect(wrapper.findAll('h1').length).toBe(0)
  })
  it(`renders props.label in header element when passed.  Can specify header level with prop`, () => {
    const label = 'hello world'
    const level = 6
    const wrapper = mount(BContainer, {
      propsData: { label, level }
    })
    expect(wrapper.find('h6').text()).toBe(label)
  })
})
