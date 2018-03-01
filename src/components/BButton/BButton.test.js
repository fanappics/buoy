import { mount, shallow } from 'vue-test-utils'
import BButton from './BButton'

describe('BButton', () => {
  it('renders a button', () => {
    const wrapper = mount(BButton, {
      propsData: {
        id: 'button-1',
        label: 'button test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a secondary button', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        id: 'button-secondary',
        label: 'secondary',
        color: 'b-secondary'
      }
    })
    expect(wrapper.classes()).toContain('b-secondary')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a disabled button', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        id: 'button-disabled',
        label: 'disabled',
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders icon when one is passed', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        id: 'button-icon',
        label: 'icon button'
      },
      slots: {
        icon: 'test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('does not render label when iconOnly true', () => {
    const wrapper = shallow(BButton, {
      propsData: {
        id: 'button-iconOnly',
        label: 'iconOnly button',
        iconOnly: true
      },
      slots: {
        icon: 'test'
      }
    })

    expect(wrapper.attributes()['title']).toBe('iconOnly button')
    expect(wrapper.text()).not.toBe('iconOnly button')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits a click event when pressed', () => {
    const stub = jest.fn()
    const wrapper = shallow(BButton, {
      propsData: {
        id: 'button-click',
        label: 'click button'
      }
    })
    wrapper.vm.$on('click', stub)
    wrapper.find('button').trigger('click')
    expect(stub).toHaveBeenCalled()
  })
})
