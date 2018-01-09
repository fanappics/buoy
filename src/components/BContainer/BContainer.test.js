import { mount } from 'vue-test-utils'
import BContainer from './BContainer'

describe('BContainer', () => {
  it('renders correctly', () => {
    const label = 'hello world'
    const level = 1
    const wrapper = mount(BContainer, {
      propsData: { label, level }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it(`renders without a label being passed. Should find no H1 element.`, () => {
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
  it(`Throw an exception if label is passed in without a level property.`, () => {
    const label = 'hello world'
    expect(() => {
      mount(BContainer, { propsData: { label } })
    }).toThrow(new Error('Property label requires a level property.'))
  })
})
