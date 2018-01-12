import { mount } from 'vue-test-utils'
import BHeader from './BHeader'

describe('BHeader', () => {
  it('renders correctly', () => {
    const slot = `<div />`
    const wrapper = mount(BHeader, {
      slots: { default: slot }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
