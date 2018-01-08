import { mount, shallow } from 'vue-test-utils'
import BButton from './BButton'

describe('BButton', () => {
  it('renders a button', () => {
    const wrapper = mount(BButton, {
      slots: {
        default: 'hello world'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('puts height and width props into style', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        height: '50px',
        width: '100px'
      }
    })

    expect(wrapper.hasStyle('height', '50px')).toBe(true)
    expect(wrapper.hasStyle('width', '100px')).toBe(true)
  })

  it('is enabled when disabled prop is not passed', () => {
    const wrapper = shallow(BButton, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('is disabled when disabled prop is passed', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.props().disabled).toBe(true)
  })

  it('has an aria-label if one is passed', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        'aria-label': 'submit button'
      }
    })

    expect(wrapper.props()['aria-label']).toBe('submit button')
  })
})
