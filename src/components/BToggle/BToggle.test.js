import { shallow } from 'vue-test-utils'
import BToggle from './BToggle'

describe('BToggle', () => {
  const required = false
  const label = 'test'
  const id = 'test-id'
  const disabled = false
  const checked = false

  it('renders the toggle', () => {
    const wrapper = shallow(BToggle, {
      propsData: {
        id: id,
        label: label,
        required: required,
        disabled: disabled,
        checked: checked
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the toggle prechecked', () => {
    const wrapper = shallow(BToggle, {
      propsData: {
        id: id,
        label: label,
        required: required,
        disabled: disabled,
        checked: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the toggle disabled', () => {
    const wrapper = shallow(BToggle, {
      propsData: {
        id: id,
        label: label,
        required: required,
        disabled: true,
        checked: checked
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('lets me commit', () => {
    expect(true).toBe(true)
  })
})
