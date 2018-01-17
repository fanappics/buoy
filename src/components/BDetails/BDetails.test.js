import { mount } from 'vue-test-utils'
import BDetails from './BDetails'

describe('BDetails', () => {
  it('renders correctly', () => {
    const summary = 'hello world'
    const wrapper = mount(BDetails, {
      propsData: { summary }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
