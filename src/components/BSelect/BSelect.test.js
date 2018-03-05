import { shallow, createLocalVue } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import BSelect from './BSelect'

const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('BSelect', () => {
  const options = [{ id: 1, value: 'test-1' }, { id: 2, value: 'test-2' }]
  const initialValue = 2
  const required = false
  const label = 'test'
  const id = 'testId'
  const placeholder = 'test placeholder'

  it('creates options when passed', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label
      },
      localVue
    })
    expect(wrapper.props().options.length).toBe(options.length)
  })

  it('intializes selected value when passed', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label,
        value: initialValue
      },
      localVue
    })
    const div = wrapper.find(`#select-${id}`)
    expect(div.text())
      .toBe(options[options.map(function (option) { return option.id }).indexOf(initialValue)].value)
  })

  it('display placeholder if no initial value', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label,
        placeholder: placeholder
      },
      localVue
    })
    const div = wrapper.find(`#select-${id}`)
    expect(div.text()).toBe('test placeholder')
  })

  it('opens list when div is mousedowned', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label,
        placeholder: placeholder
      },
      localVue
    })
    const div = wrapper.find(`#select-${id}`)
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
        options: options,
        required: required,
        label: label,
        placeholder: placeholder
      },
      localVue
    })
    const div = wrapper.find(`#select-${id}`)
    div.trigger('mousedown')
    await wrapper.vm.$nextTick()
    const line = wrapper.find('li')
    line.trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedOption.id).toBe(options[0].id)
  })

  it('throws error if option not chosen when required', async () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: true,
        label: label
      },
      localVue
    })
    const div = wrapper.find(`#select-${id}`)
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
        options: options,
        required: required,
        label: label
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('rendors a select list with an initial value', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label,
        value: initialValue
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('rendors a select list with a placeholder', () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label,
        placeholder: placeholder
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('calls on handlers', async () => {
    const wrapper = shallow(BSelect, {
      propsData: {
        id: id,
        options: options,
        required: required,
        label: label,
        placeholder: placeholder
      },
      localVue
    })
    const upHandler = jest.fn()
    wrapper.vm.$on('upHandler', upHandler)
    const div = wrapper.find(`#select-${id}`)
    div.trigger('mousedown')
    await wrapper.vm.$nextTick()
    const line = wrapper.find('li')
    line.trigger('keyup.down')
    expect(line.html()).toMatchSnapshot()
    line.trigger('keyup.up')
    expect(line.html()).toMatchSnapshot()
  })
})
