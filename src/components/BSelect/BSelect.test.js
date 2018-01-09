import { shallow, mount } from 'vue-test-utils'
import BSelect from './BSelect'

describe('BSelect', () => {
  const selectOptions = [{id: 1, text: 'test'}]
  const initialValue = {id: 1, text: 'test'}
  const isRequired = false
  const selectLabel = 'test'
  const id = 'testId'
  const placeholder = 'test placeholder'

  it('creates options when passed', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel
      }
    })
    expect(wrapper.props().selectOptions.length).toBe(selectOptions.length)
  })

  it('intializes selected value when passed', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel,
        initialValue: initialValue
      }
    })
    const initialLine = wrapper.find('li')
    expect(initialLine.text()).toBe('test')
  })

  it('display placeholder if no initial value', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    const initialLine = wrapper.find('li')
    expect(initialLine.text()).toBe('test placeholder')
  })

  it('opens list when line is clicked', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    const initialLine = wrapper.find('li')
    expect(initialLine.hasClass('li-opened')).toBe(false)
    initialLine.trigger('click')
    expect(initialLine.hasClass('li-opened')).toBe(true)
  })

  it('rendors a default select list', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('rendors a select list with an initial value', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel,
        initialValue: initialValue
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('rendors a select list with a placeholder', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        isRequired: isRequired,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
