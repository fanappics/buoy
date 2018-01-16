import { createLocalVue, shallow } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import BValidator from './BValidator'

const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('BValidator', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BValidator, {
      propsData: {
        scope: 'scope'
      },
      localVue
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
