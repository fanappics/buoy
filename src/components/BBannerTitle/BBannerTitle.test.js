import { mount } from 'vue-test-utils'
import BBannerTitle from './BBannerTitle'

describe('BBannerTitle', () => {
  it('should render banner title', () => {
    const wrapper = mount(BBannerTitle)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
