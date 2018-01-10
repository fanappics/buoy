import { shallow } from 'vue-test-utils'
import BNav from './BNav'

describe('BNav', () => {
  it('renders a button', () => {
    const wrapper = shallow(BNav)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
