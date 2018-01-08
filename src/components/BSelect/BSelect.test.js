import { shallow, mount } from 'vue-test-utils'
import BSelect from './BSelect'

describe('BSelect', () => {
  it('creates options when passed', () => {
    const selectOptions = [{id: 1, text: 'test'}]
    const isRequired = false
    const selectLabel = 'test'
    const id = 'testId'
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
    const selectOptions = [{id: 1, text: 'test'}]
    const initialValue = {id: 1, text: 'test'}
    const isRequired = false
    const selectLabel = 'test'
    const id = 'testId'
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
    const selectOptions = [{id: 1, text: 'test'}]
    const placeholder = 'test placeholder'
    const isRequired = false
    const selectLabel = 'test'
    const id = 'testId'
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
    const selectOptions = [{id: 1, text: 'test'}]
    const placeholder = 'test placeholder'
    const isRequired = false
    const selectLabel = 'test'
    const id = 'testId'
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
})
