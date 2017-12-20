import { shallow } from 'vue-test-utils'
import BSelectOption from './BSelectOption'

describe('BSelectOption', () => {
  it('renders option when passed object', () => {
    const option = {id: 1, text: 'test'}
    const wrapper = shallow(BSelectOption, {
      propsData: {option}
    })
    expect(wrapper.props().option.text).toBe(option.text)
  })
})
