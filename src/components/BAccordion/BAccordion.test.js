import { mount } from 'vue-test-utils'
import BContainer from './BAccordion'

describe('BContainer', () => {
  it('triggers toggleExpansion when header button is clicked', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const wrapper = mount(BContainer,
      {
        propsData: {
          label
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section > div > button').trigger('click')
    expect(spy).toHaveBeenCalled()
  })
  it('triggers toggleExpansion when focus is on header and enter is pressed', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const wrapper = mount(BContainer,
      {
        propsData: {
          label
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section > div > button').trigger('keyup.enter')
    expect(spy).toHaveBeenCalled()
  })
  it('triggers toggleExpansion when focus is on header and spacebar is pressed', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const wrapper = mount(BContainer,
      {
        propsData: {
          label
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section > div > button').trigger('keyup.space')
    expect(spy).toHaveBeenCalled()
  })
})
