import { shallow } from 'vue-test-utils'
import BNav from './BNav'

describe('BNav', () => {
  it('should render a nav', () => {
    const wrapper = shallow(BNav)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
