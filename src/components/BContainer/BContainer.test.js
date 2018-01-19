import { mount } from 'vue-test-utils'
import BContainer from './BContainer'

describe('BContainer', () => {
  it('renders correctly', () => {
    const label = 'hello world'
    const headerLevel = 1
    const wrapper = mount(BContainer, {
      propsData: { label, headerLevel }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('renders an element with no h element if hideLabel is passed', () => {
    const label = 'hello world'
    const hideLabel = true
    const wrapper = mount(BContainer, {
      propsData: { label, hideLabel }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('renders props.label in header element when passed.  Can specify header level with prop', () => {
    const label = 'hello world'
    const headerLevel = 6
    const wrapper = mount(BContainer, {
      propsData: { label, headerLevel }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Default to H2 if label is passed in without a headerLevel property.', () => {
    console.warn = jest.fn()
    const label = 'hello world'
    const wrapper = mount(BContainer, { propsData: { label } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(console.warn).toHaveBeenCalledWith('No headerLevel property set, defaulting to 2')
  })
  it('Default to H2 if label is passed in with an invalid headerLevel property. Should log to console.error.', () => {
    console.error = jest.fn()
    const label = 'hello world'
    const headerLevel = 'The Greatest Importance'
    const wrapper = mount(BContainer, { propsData: { label, headerLevel } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(console.error).toHaveBeenCalledWith('Invalid headerLevel property set. Valid input are numbers 1-6.  Reverting to default level 2.')
  })
  it('shows an arrow if expandable prop is passed', () => {
    const label = 'hello world'
    const headerLevel = 3
    const wrapper = mount(BContainer, { propsData: { label, headerLevel, expandable: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('does not show arrow if expandable prop is not passed', () => {
    const label = 'hello world'
    const headerLevel = 3
    const wrapper = mount(BContainer, { propsData: { label, headerLevel } })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('triggers toggleExpansion when arrow is clicked', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const headerLevel = 3
    const wrapper = mount(BContainer,
      {
        propsData: {
          label,
          headerLevel,
          expandable: true
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section > div > span').trigger('click')
    expect(spy).toHaveBeenCalled()
  })
  it('triggers toggleExpansion when focus is on header and enter is pressed', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const headerLevel = 3
    const wrapper = mount(BContainer,
      {
        propsData: {
          label,
          headerLevel,
          expandable: true
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section').trigger('keyup.enter')
    expect(spy).toHaveBeenCalled()
  })
  it('triggers toggleExpansion when focus is on header and spacebar is pressed', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const headerLevel = 3
    const wrapper = mount(BContainer,
      {
        propsData: {
          label,
          headerLevel,
          expandable: true
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section').trigger('keyup.space')
    expect(spy).toHaveBeenCalled()
  })
  it('should not collapse or expand if expandable prop is not passed', () => {
    const spy = jest.fn()
    const label = 'hello world'
    const headerLevel = 3
    const wrapper = mount(BContainer,
      {
        propsData: {
          label,
          headerLevel,
          expandable: true
        },
        methods: { toggleExpansion: spy }
      }
    )
    wrapper.find('section > div > span').trigger('click')
    expect(wrapper.vm.expanded).toBe(true)
  })
})
