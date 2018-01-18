import { mount } from 'vue-test-utils'
import BShuttle from './BShuttle'

describe('BShuttle', () => {
  it('BShuttle renders correctly', () => {
    const wrapper = mount(BShuttle, {
      // Include Options Here - https://vue-test-utils.vuejs.org/en/api/options.html
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
