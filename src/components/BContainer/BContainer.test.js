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
  it(`renders props.label in H1 when passed`, () => {
    const label = 'hello world'
    const wrapper = mount(BContainer, {
      propsData: { label }
    })
    expect(wrapper.find('h1').text()).toBe(label)
  })
  it(`shouldn't render an H1 when no props.label is passed.`, () => {
    const wrapper = mount(BContainer)
    expect(wrapper.findAll('h1').length).toBe(0)
  })
})
