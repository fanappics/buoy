import { mount, shallow } from 'vue-test-utils'
import BAccordion from './BAccordion'

describe('BAccordion', () => {
  describe('basic accordion', () => {
    it('mounted html should match snapshot', () => {
      const wrapper = shallow(BAccordion, {
        propsData: {
          id: 'accordion-1',
          label: 'hello world'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('collapsed accordion', () => {
    it('mounted html should match snapshot', () => {
      const wrapper = shallow(BAccordion, {
        propsData: {
          id: 'accordion-1',
          label: 'hello world',
          collapsed: true
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('header actions', () => {
    it('triggers toggleExpansion when header button is clicked', () => {
      const spy = jest.fn()
      const wrapper = mount(BAccordion,
        {
          propsData: {
            id: 'accordion-1',
            label: 'hello world'
          },
          methods: { toggleExpansion: spy }
        }
      )
      wrapper.find('section > div > button').trigger('click')
      expect(spy).toHaveBeenCalled()
    })
    it('triggers toggleExpansion when focus is on header and enter is pressed', () => {
      const spy = jest.fn()
      const wrapper = mount(BAccordion,
        {
          propsData: {
            id: 'accordion-1',
            label: 'hello world'
          },
          methods: { toggleExpansion: spy }
        }
      )
      wrapper.find('section > div > button').trigger('keyup.enter')
      expect(spy).toHaveBeenCalled()
    })
    it('triggers toggleExpansion when focus is on header and spacebar is pressed', () => {
      const spy = jest.fn()
      const wrapper = mount(BAccordion,
        {
          propsData: {
            id: 'accordion-1',
            label: 'hello world'
          },
          methods: { toggleExpansion: spy }
        }
      )
      wrapper.find('section > div > button').trigger('keyup.space')
      expect(spy).toHaveBeenCalled()
    })
  })
})
