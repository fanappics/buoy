import { shallow } from 'vue-test-utils'
import BSelect from './BSelect'

describe('BSelect', () => {
  const selectOptions = [{ id: 1, displayName: 'test-1' }, { id: 2, displayName: 'test-2' }]
  const initialValue = { id: 1, displayName: 'test-1' }
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
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
        selectLabel: selectLabel,
        initialValue: initialValue
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    expect(div.text()).toBe(initialValue.displayName)
  })

  it('display placeholder if no initial value', () => {
    const wrapper = shallow(BSelect, {
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

  it('opens list when div is mousedowned', () => {
    const wrapper = shallow(BSelect, {
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
    expect(wrapper.vm.opened).toBe(false)
    div.trigger('mousedown')
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.opened).toBe(true)
  })

  it('selects item when mousedowned', async () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    div.trigger('mousedown')
    await wrapper.vm.$nextTick()
    const line = wrapper.find('li')
    line.trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedOption.id).toBe(selectOptions[0].id)
  })

  it('throws error if option not chosen when required', async () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: true,
        selectLabel: selectLabel
      }
    })
    const div = wrapper.find(`#dropdown-${id}`)
    div.trigger('mousedown')
    await wrapper.vm.$nextTick()
    div.trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('rendors a default select list', () => {
    const wrapper = shallow(BSelect, {
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
    const wrapper = shallow(BSelect, {
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
    const wrapper = shallow(BSelect, {
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

  it('calls on handlers', async () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        selectOptions: selectOptions,
        required: required,
        selectLabel: selectLabel,
        placeholder: placeholder
      }
    })
    const upHandler = jest.fn()
    wrapper.vm.$on('upHandler', upHandler)
    const div = wrapper.find(`#dropdown-${id}`)
    div.trigger('mousedown')
    await wrapper.vm.$nextTick()
    const line = wrapper.find('li')
    line.trigger('keyup.down')
    expect(line.html()).toMatchSnapshot()
    line.trigger('keyup.up')
    expect(line.html()).toMatchSnapshot()
  })
})
