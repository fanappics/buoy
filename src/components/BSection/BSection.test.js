import { mount } from 'vue-test-utils'
import BSection from './BSection'

describe('BSection', () => {
  it('renders correctly', () => {
    const slot = `<div />`
    const wrapper = mount(BSection, {
      slots: { default: slot }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
