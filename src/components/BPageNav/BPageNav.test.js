import { shallow } from 'vue-test-utils'
import BPageNav from './BPageNav'
import events from '../../event-bus'

describe('Page nav', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BPageNav, {
      propsData: {
        links: [{ label: 'Link', href: 'link-1', completed: true }]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('fires optional event on click', () => {
    events.$emit = jest.fn()
    const wrapper = shallow(BPageNav, {
      propsData: {
        links: [{ label: 'Link', href: 'link-1', event: 'event' }]
      }
    })
    wrapper.find('nav > ul > li > a').trigger('keyup.enter')
    expect(events.$emit).toHaveBeenCalled()
  })
})

describe('Page nav multiple links', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BPageNav, {
      propsData: {
        links: [{ label: 'Link', href: 'link-1', completed: true }, { label: 'Link2', href: 'link-2', completed: false }]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
