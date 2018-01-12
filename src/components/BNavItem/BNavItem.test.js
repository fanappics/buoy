import { shallow } from 'vue-test-utils'
import BNavItem from './BNavItem'

describe('BNavItem', () => {
  it('should render nav item', () => {
    const wrapper = shallow(BNavItem)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
