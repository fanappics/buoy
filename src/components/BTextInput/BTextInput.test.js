import { shallow } from 'vue-test-utils'
import BTextInput from './BTextInput'

describe('BTextInput', () => {
  it('should render component and match snapshot', () => {
    const wrapper = shallow(BTextInput)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should pass events to internal input field', () => {
    const keyup = jest.fn()
    const component = {
      render (h) {
        return h(BTextInput, { on: { keyUp: keyup }, props: { download: '' }, attrs: {} })
      }
    }
    const wrapper = shallow(component)

    const input = wrapper.find('input')
    input.trigger('keyUp', { keyCode: 65 })

    expect(keyup).toBeCalled()
  })

  it('should render aria-label attribute on text field element with label value and no id', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    })

    const inputGroup = wrapper.find('input')
    expect(inputGroup.attributes()['aria-label']).toBe('Test')
  })

  it('should not render aria-label attribute on text field element with no label value or id', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        label: null
      },
      attrs: {}
    })

    const inputGroup = wrapper.find('input')
    expect(inputGroup.attributes()['aria-label']).toBeFalsy()
  })

  it('should not render aria-label attribute on text field element with id', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        label: 'Test'
      },
      attrs: {
        id: 'Test'
      }
    })

    const inputGroup = wrapper.find('input')
    expect(inputGroup.attributes()['aria-label']).toBeFalsy()
  })

  it('should start out as invalid', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        rules: [(v) => !!v || 'Required']
      }
    })

    expect(wrapper.vm.valid).toEqual(false)
  })

  it('should start validating on input', async () => {
    const wrapper = shallow(BTextInput, {})

    expect(wrapper.vm.shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.shouldValidate).toEqual(true)
  })

  it('should not start validating on input if validate-on-blur prop is set', async () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        validateOnBlur: true
      }
    })

    expect(wrapper.vm.shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.shouldValidate).toEqual(false)
  })

  it('should not display counter when set to false', async () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        counter: true,
        max: 50
      }
    })

    expect(wrapper.find('.input-group__counter')).not.toBe(undefined)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ counter: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.input-group__counter').constructor.name).toEqual('ErrorWrapper')
  })

  it('should have readonly attribute', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        readonly: true
      }
    })

    const input = wrapper.find('input')

    expect(input.attributes()['readonly']).toBe('readonly')
  })

  // for clearable - requires VIcon component
  // it('should clear input value', async () => {
  //   const wrapper = shallow(VTextField, {
  //     propsData: {
  //       clearable: true,
  //       value: 'foo'
  //     }
  //   })

  //   const clear = wrapper.find('.input-group__append-icon')[0]
  //   const input = jest.fn()
  //   wrapper.vm.$on('input', input)

  //   expect(wrapper.vm.inputValue).toBe('foo')

  //   clear.trigger('click')

  //   await wrapper.vm.$nextTick()

  //   expect(input).toHaveBeenCalledWith(null)
  // })

  // it('should not clear input if not clearable and has appended icon (with callback)', async () => {
  //   const appendIconCb = jest.fn()
  //   const wrapper = shallow(VTextField, {
  //     propsData: {
  //       value: 'foo',
  //       appendIcon: 'block',
  //       appendIconCb
  //     }
  //   })

  //   const icon = wrapper.find('.input-group__append-icon')[0]
  //   icon.trigger('click')
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.inputValue).toBe('foo')
  //   expect(appendIconCb.mock.calls).toHaveLength(1)
  // })

  // it('should not clear input if not clearable and has appended icon (without callback)', async () => {
  //   const wrapper = shallow(VTextField, {
  //     propsData: {
  //       value: 'foo',
  //       appendIcon: 'block',
  //     }
  //   })

  //   const icon = wrapper.find('.input-group__append-icon')[0]
  //   icon.trigger('click')
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.inputValue).toBe('foo')
  // })

  it('should start validating on blur', async () => {
    const wrapper = shallow(BTextInput, {})

    const input = wrapper.find('input')
    expect(wrapper.vm.shouldValidate).toEqual(false)
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.shouldValidate).toEqual(true)
  })

  it('should keep its value on blur', async () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        value: 'asd'
      }
    })

    const input = wrapper.find('input')

    input.element.value = 'fgh'
    input.trigger('input')
    input.trigger('blur')

    expect(input.element.value).toBe('fgh')
  })

  it('should update if value is changed externally', async () => {
    const wrapper = shallow(BTextInput, {})

    const input = wrapper.find('input')

    wrapper.setProps({ value: 'fgh' })
    expect(input.element.value).toBe('fgh')

    input.trigger('focus')
    wrapper.setProps({ value: 'jkl' })
    expect(input.element.value).toBe('jkl')
  })

  it('should fire a single change event on blur', async () => {
    let value = 'asd'
    const change = jest.fn()

    const component = {
      render (h) {
        return h(BTextInput, {
          on: {
            input: (i) => {
              value = i
            },
            change
          },
          props: { value }
        })
      }
    }
    const wrapper = shallow(component)

    const input = wrapper.find('input')

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = 'fgh'
    input.trigger('input')

    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith('fgh')
    expect(change.mock.calls).toHaveLength(1)
  })

  it('should not emit change event if value has not changed', async () => {
    const change = jest.fn()
    let value = 'test'
    const component = {
      render (h) {
        return h(BTextInput, {
          on: {
            input: i => {
              value = i
            },
            change
          },
          props: { value }
        })
      }
    }
    const wrapper = shallow(component)

    const input = wrapper.find('input')

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change.mock.calls).toHaveLength(0)
  })

  it('should display the number 0', async () => {
    const wrapper = shallow(BTextInput, {
      propsData: { value: 0 }
    })

    expect(wrapper.vm.$refs.input.value).toBe('0')
  })

  it('should reset internal change on blur', async () => {
    const wrapper = shallow(BTextInput)

    wrapper.setProps({ value: 'foo' })
    wrapper.vm.internalChange = true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalChange).toBe(true)

    wrapper.vm.blur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalChange).toBe(false)
  })

  // wrapper.vm.$on is never getting called, not sure how this translates to new test framework
  //
  // it('should emit input when externally set value was modified internally', async () => {
  //   let value = '33'
  //   const input = jest.fn()
  //   const wrapper = shallow(BTextInput, {
  //     propsData: {
  //       value
  //     }
  //   })

  //   wrapper.vm.$on('input', (v) => {
  //     console.log(v)
  //     value = v
  //   })
  //   wrapper.vm.$on('input', input)

  //   wrapper.setProps({ value: '4444' })
  //   await wrapper.vm.$nextTick()

  //   expect(value).toBe('44')
  //   expect(input).toBeCalled()
  // })

  it('should have required attribute', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        required: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have no rules when not passed rules or set to required', () => {
    const wrapper = shallow(BTextInput)

    expect(wrapper.vm.rules).toHaveLength(0)
  })

  it('should have a rule when the required flag is set', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        required: true
      }
    })

    expect(wrapper.vm.rules).toHaveLength(1)
  })

  it('should have an asterisk if required is set to true', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        label: 'mock',
        required: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display an error if an input blank and required', async () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        required: true
      },
      attrs: {
        id: 'mock'
      }
    })

    const input = wrapper.find('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(true)
    expect(wrapper.vm.validations).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display multiple errors should they exist', async () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        required: true,
        rules: [v => !!v || 'Test']
      },
      attrs: {
        id: 'mock'
      }
    })

    const input = wrapper.find('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(true)
    expect(wrapper.vm.validations).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should error when mounting with an invalid type', () => {
    function mountInput () {
      shallow(BTextInput, {
        propsData: {
          type: 'radio'
        }
      })
    }

    expect(mountInput).toThrowError(TypeError)
    expect(mountInput).toThrowError('radio is not a valid type for b-text-input')
  })

  it('should prepend a prefix before the input', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        prefix: '$'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should append a suffix after the input', () => {
    const wrapper = shallow(BTextInput, {
      propsData: {
        suffix: '.00'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
