import { shallow } from 'vue-test-utils'
import BSelect from './BSelect'

describe('BSelect', () => {
  it('creates options when passed', () => {
    const selectOptions = [{id: 1, text: 'test'}]
    const isRequired = false
    const selectLabel = 'test'
    const id = 'testId'
    const wrapper = shallow(BSelect, {
      propsData: { id, selectOptions, isRequired, selectLabel }
    })
    expect(wrapper.props().selectOptions.length).toBe(selectOptions.length)
  })
})
