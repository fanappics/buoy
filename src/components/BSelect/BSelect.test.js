import { shallow } from 'vue-test-utils'
import BSelect from './BSelect'

describe('BSelect', () => {
  it('creates options when passed', () => {
    const selectOptions = [{id: 1, text: 'test'}]
    const wrapper = shallow(BSelect, {
      propsData: { selectOptions }
    })
    expect(wrapper.props().selectOptions.length).toBe(selectOptions.length)
  })
})
