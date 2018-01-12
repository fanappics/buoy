import { mount } from 'vue-test-utils'
import BBanner from './BBanner'

describe('BBanner', () => {
  it('renders a button', () => {
    const wrapper = mount(BBanner)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
