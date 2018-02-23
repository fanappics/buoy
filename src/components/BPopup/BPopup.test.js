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
