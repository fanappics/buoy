import { mount } from 'vue-test-utils'
import BCell from './BCell'

describe('BCell', () => {
  it('BCell renders correctly', () => {
    const wrapper = mount(BCell, {
      // Include Options Here - https://vue-test-utils.vuejs.org/en/api/options.html
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})