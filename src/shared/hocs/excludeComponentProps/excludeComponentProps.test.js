import React from 'react';
import { mount } from 'enzyme';
import excludeComponentProps from './excludeComponentProps';

const Component = () => <div />;

const props = {
  validProp: 'test-valid-prop',
  invalidProp: 'test-invalid-prop',
};

describe('excludeComponentProps', () => {
  it('should render correctly', () => {
    const CustomComponent = excludeComponentProps(Component, ['invalidProp']);

    const wrapper = mount(<CustomComponent {...props} />);

    const component = wrapper.find(Component);

    const { validProp } = props;

    expect(component).toHaveLength(1);
    expect(component.getElement().ref).toBeDefined();
    expect(component.prop('validProp')).toBe(validProp);
    expect(component.prop('invalidProp')).toBeUndefined();
  });
});
