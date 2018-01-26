import { createLocalVue, shallow } from 'vue-test-utils'
import BShuttle from './BShuttle'

import VeeValidate from 'vee-validate'
const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('BShuttle', () => {
  const shuttleOptions = [{ id: 1, displayName: 'test-1' }, { id: 2, displayName: 'test-2' }]
  const placeholder = 'Testing Placeholder'
  const availableLabel = 'test available label'
  const chosenLabel = 'test chosen label'
  const prechosen = [1]

  it('BShuttle renders correctly', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('creates options when passed', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    expect(wrapper.props().options.length).toBe(shuttleOptions.length)
  })

  it('displays placeholder if no initial options', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        availableLabel: availableLabel,
        chosenLabel: chosenLabel,
        placeholder: placeholder
      },
      localVue
    })
    const div = wrapper.find('li')
    expect(div.text()).toBe(placeholder)
  })

  it('intializes chosen value when passed', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel,
        value: prechosen
      },
      localVue
    })
    expect(wrapper.vm.chosenOptions.length).toBe(1)
    expect(wrapper.vm.chosenOptions[0].id).toBe(1)
  })

  it('highlights row when clicked', async () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    await wrapper.vm.$nextTick()
    const line = wrapper.find(`#available-option-${wrapper.vm.id}-${shuttleOptions[0].id}`)
    expect(line.classes()).not.toContain('selected')
    line.trigger('click')
    expect(line.classes()).toContain('selected')
  })

  it('moves row when chosen arrow clicked', async () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    await wrapper.vm.$nextTick()
    const line = wrapper.find(`#available-option-${wrapper.vm.id}-${shuttleOptions[0].id}`)
    const button = wrapper.find('#selected-to-chosen')
    line.trigger('click')
    button.trigger('click')
    expect(wrapper.vm.chosenOptions.length).toBe(1)
    expect(wrapper.vm.chosenOptions[0].id).toBe(1)
  })

  it('moves row when available arrow clicked', async () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    await wrapper.vm.$nextTick()
    const line = wrapper.find(`#available-option-${wrapper.vm.id}-${shuttleOptions[0].id}`)
    const button = wrapper.find('#selected-to-chosen')
    line.trigger('click')
    button.trigger('click')
    const chosenLine = wrapper.find(`#chosen-option-${wrapper.vm.id}-${shuttleOptions[0].id}`)
    const chosenButton = wrapper.find('#selected-to-available')
    chosenLine.trigger('click')
    chosenButton.trigger('click')
    expect(wrapper.vm.chosenOptions.length).toBe(0)
    expect(wrapper.vm.availableOptions.length).toBe(2)
    expect(wrapper.vm.availableOptions[0].id).toBe(1)
  })

  it('moves all rows to chosen when button clicked', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    const button = wrapper.find('#all-to-chosen')
    expect(wrapper.vm.chosenOptions.length).toBe(0)
    button.trigger('click')
    expect(wrapper.vm.chosenOptions.length).toBe(2)
  })

  it('moves all rows to available when button clicked', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      },
      localVue
    })
    const chosenButton = wrapper.find('#all-to-chosen')
    const availableButton = wrapper.find('#all-to-available')
    expect(wrapper.vm.chosenOptions.length).toBe(0)
    chosenButton.trigger('click')
    expect(wrapper.vm.chosenOptions.length).toBe(2)
    expect(wrapper.vm.availableOptions.length).toBe(0)
    availableButton.trigger('click')
    expect(wrapper.vm.chosenOptions.length).toBe(0)
    expect(wrapper.vm.availableOptions.length).toBe(2)
  })
})
