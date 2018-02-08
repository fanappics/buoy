import { createLocalVue, shallow } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import BTextarea from './BTextarea'

const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('BTextarea', () => {
  it('should render component', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        label: 'test',
        id: 'test'
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with a label', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        label: 'test',
        id: 'test'
      },
      localVue
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with label and asterisk', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        label: 'test',
        required: true,
        id: 'test'
      },
      localVue
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should add disabled class when the disabled prop is set', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        disabled: true,
        id: 'test',
        label: 'test'
      },
      localVue
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should fail validation if input exceeds maxLength', async () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        validationName: 'maxLength',
        maxLength: 1,
        id: 'test',
        label: 'test'
      },
      localVue
    })

    const textarea = wrapper.find('textarea')
    textarea.trigger('focus')
    await wrapper.vm.$nextTick()
    textarea.element.innerHTML = '12'
    textarea.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.invalid).toBe(true)
  })

  it('should fail validation if input is less than minLength', async () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        validationName: 'minLength',
        minLength: 5,
        id: 'test',
        label: 'test'
      },
      localVue
    })

    const textarea = wrapper.find('textarea')
    textarea.trigger('focus')
    await wrapper.vm.$nextTick()
    textarea.element.innerHTML = '12'
    textarea.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.invalid).toBe(true)
  })
})
