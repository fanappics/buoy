import { shallow } from 'vue-test-utils'
import BButton from './BButton'

describe('BButton', () => {
  it('renders props.text when passed', () => {
    const text = 'hello world'
    const wrapper = shallow(BButton, {
      slots: {
        default: 'hello world'
      }
    })
    expect(wrapper.text()).toBe(text)
  })
})
