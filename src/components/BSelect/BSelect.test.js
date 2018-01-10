import { shallow, mount } from 'vue-test-utils'
import BSelect from './BSelect'

describe('BSelect', () => {
  const selectOptions = [{id: 1, text: 'test'}]
  const initialValue = {id: 1, text: 'test'}
  const required = false
  const selectLabel = 'test'
  const id = 'testId'
  const placeholder = 'test placeholder'

  it('creates options when passed', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
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
        required: required,
        selectLabel: selectLabel,
        initialValue: initialValue
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    expect(div.text()).toBe('test')
  })

  it('display placeholder if no initial value', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    expect(div.text()).toBe('test placeholder')
  })

  it('opens list when div is clicked', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    expect(wrapper.html()).toMatchSnapshot()
    div.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  xit('throws error if option not chosen when required', async () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
        selectLabel: selectLabel
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    await wrapper.vm.$nextTick()
    div.trigger('click')
    div.trigger('click')
    console.log(wrapper.html())
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('rendors a default select list', () => {
    const wrapper = mount(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
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
        required: required,
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
        required: required,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
