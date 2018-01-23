import { shallow } from 'vue-test-utils'
import BShuttle from './BShuttle'

describe('BShuttle', () => {
  const shuttleOptions = [{id: 1, displayName: 'test-1'}, {id: 2, displayName: 'test-2'}]
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
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('creates options when passed', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel
      }
    })
    expect(wrapper.props().options.length).toBe(shuttleOptions.length)
  })

  it('displays placeholder if no initial options', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        availableLabel: availableLabel,
        chosenLabel: chosenLabel,
        placeholder: placeholder
      }
    })
    const div = wrapper.find(`li`)
    expect(div.text()).toBe(placeholder)
  })

  it('intializes chosen value when passed', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions,
        availableLabel: availableLabel,
        chosenLabel: chosenLabel,
        value: prechosen
      }
    })
    expect(wrapper.vm.chosenOptions.length).toBe(1)
    expect(wrapper.vm.chosenOptions[0].id).toBe(1)
  })
})
