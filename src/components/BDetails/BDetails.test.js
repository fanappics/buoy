import { mount } from 'vue-test-utils'
import BContainer from './BDetails'

describe('BContainer', () => {
  it('renders correctly', () => {
    const summary = 'hello world'
    const wrapper = mount(BContainer, {
      propsData: { summary }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
