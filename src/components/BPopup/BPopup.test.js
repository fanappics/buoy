import { mount } from 'vue-test-utils'
import BPopup from './BPopup'

describe('BPopup', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Sample popup message',
        visible: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('BPopup not visible', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Sample popup message',
        visible: false
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('BPopup with confirmation buttons', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Are you sure?',
        visible: true,
        confirm: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits a confirm event when confirm button is pressed', () => {
    const confirm = jest.fn()
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Are you sure?',
        visible: true,
        confirm: true
      }
    })
    wrapper.vm.$on('confirm', confirm)
    wrapper.find('.b-footer > button:last-child').trigger('click')
    expect(confirm).toHaveBeenCalled()
  })

  it('emits a cancel event when cancel button is pressed', () => {
    const cancel = jest.fn()
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Are you sure?',
        visible: true,
        confirm: true
      }
    })
    wrapper.vm.$on('cancel', cancel)
    wrapper.find('.b-footer > button:first-child').trigger('click')
    expect(cancel).toHaveBeenCalled()
  })
})

describe('BPopup with overriding size styling', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Sample popup message',
        visible: true,
        width: '500',
        height: '900'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('BPopup with offset styling', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = mount(BPopup, {
      propsData: {
        message: 'Sample popup message',
        visible: true,
        offsetX: '99',
        offsetY: '-99'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
