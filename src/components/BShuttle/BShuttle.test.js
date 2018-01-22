import { shallow } from 'vue-test-utils'
import BShuttle from './BShuttle'

describe('BShuttle', () => {
  const shuttleOptions = [{id: 1, displayName: 'test-1'}, {id: 2, displayName: 'test-2'}]

  it('BShuttle renders correctly', () => {
    const wrapper = shallow(BShuttle, {
      propsData: {
        options: shuttleOptions
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
