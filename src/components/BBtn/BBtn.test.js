import { shallow } from 'vue-test-utils'
import BBtn from './BBtn'

describe('BBtn', () => {
  it('renders props.text when passed', () => {
    const text = 'hello world'
    const wrapper = shallow(BBtn, {
      propsData: { text }
    })
    expect(wrapper.text()).toBe(text)
  })
})
