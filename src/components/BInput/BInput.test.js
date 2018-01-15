import { createLocalVue, shallow } from 'vue-test-utils';
import VeeValidate from 'vee-validate';
import BInput from './BInput';

const localVue = createLocalVue();
localVue.use(VeeValidate);

describe('Text input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Number input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        type: 'number',
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Currency input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        type: 'currency',
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Disabled input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        disabled: true,
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Required input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        required: true,
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Pattern input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        pattern: '^([0-9]+)$',
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Readonly input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        readonly: true,
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Named input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        name: 'Name of Input',
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Autofocused input', () => {
  it('mounted html should match snapshot', () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        autofocus: true,
      },
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Required input failing validation', () => {
  it('mounted html should match snapshot', async () => {
    const wrapper = shallow(BInput, {
      propsData: {
        id: 'input-1',
        label: 'My Input',
        required: true,
      },
      localVue,
    });

    const input = wrapper.find('input');
    input.trigger('focus');
    await wrapper.vm.$nextTick();
    input.element.value = ' ';
    input.trigger('input');
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
