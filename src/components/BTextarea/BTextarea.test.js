import { shallow } from 'vue-test-utils';
import BTextarea from './BTextarea';

describe('BTextarea', () => {
  it('should render component', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        label: 'test',
        id: 'test',
        name: 'test'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with a label', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        label: 'test',
        id: 'test',
        name: 'test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with label and asterisk', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        label: 'test',
        required: true,
        id: 'test',
        name: 'test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add disabled class when the disabled prop is set', () => {
    const wrapper = shallow(BTextarea, {
      propsData: {
        disabled: true,
        id: 'test',
        name: 'test',
        label: 'test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot();
  });
});
