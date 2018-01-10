import { mount, shallow } from 'vue-test-utils'
import BNav from './BNav'

describe('BNav', () => {
  it('renders a button', () => {
    const wrapper = mount(BNav)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
