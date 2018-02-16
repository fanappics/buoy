import { mount } from 'vue-test-utils'
import BTable from './BTable'

describe('BTable', () => {
  const label = 'test label'
  const testId = 'test id'

  it('BTable renders correctly', () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: testId,
        label: label
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
