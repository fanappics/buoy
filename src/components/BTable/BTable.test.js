import { mount } from 'vue-test-utils'
import BTable from './BTable'

describe('BTable', () => {
  it('BTable renders correctly', () => {
    const wrapper = mount(BTable, {
      // Include Options Here - https://vue-test-utils.vuejs.org/en/api/options.html
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
