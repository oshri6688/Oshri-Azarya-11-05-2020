import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { Typography, CircularProgress } from '@material-ui/core';
import { createObjectGenerator } from 'utils/TestUtils/TestUtils';
import { StyledDataWidget, LoadingWrapper } from './DataWidget.style';
import DataWidget from './DataWidget';

jest.mock('@material-ui/core', () => ({
  Typography: ({ children }) => <div children={children} />,
  CircularProgress: () => <div />,
}));

const Children = () => <div />;

const defaultProps = {
  loading: false,
  hasData: true,
  noDataMessage: 'test-no-data-message',
  children: <Children />,
  className: 'test-class-name',
};

const generateProps = createObjectGenerator(defaultProps);

describe('DataWidget', () => {
  describe('mounting', () => {
    const testRender = ({ props, shouldRenderChildren = false, shouldRenderNoDataMessage = false }) => {
      const wrapper = mount(<DataWidget {...props} />);
      const styledDataWidget = wrapper.find(StyledDataWidget);
      const typography = styledDataWidget.find(Typography);
      const loadingWrapper = styledDataWidget.find(LoadingWrapper);

      const { loading, noDataMessage, className } = props;

      expect(styledDataWidget).toHaveLength(1);
      expect(styledDataWidget.prop('className')).toBe(className);

      expect(styledDataWidget.exists(Children)).toBe(shouldRenderChildren);

      if (shouldRenderNoDataMessage) {
        expect(typography).toHaveLength(1);
        expect(typography.prop('variant')).toBe('h6');
        expect(typography.prop('color')).toBe('textSecondary');
        expect(typography.text()).toBe(noDataMessage);
      } else {
        expect(typography).toHaveLength(0);
      }

      expect(loadingWrapper).toHaveLength(1);
      expect(loadingWrapper.prop('isLoading')).toBe(loading);

      expect(loadingWrapper).toHaveStyleRule('display', loading ? 'flex' : 'none');

      expect(loadingWrapper.exists(CircularProgress)).toBe(true);
    };

    it('should render correctly when hasData is true', () => {
      const props = generateProps();

      testRender({ props, shouldRenderChildren: true });
    });

    it('should render correctly when hasData is false', () => {
      const props = generateProps({ hasData: false });

      testRender({ props, shouldRenderNoDataMessage: true });
    });

    it('should render correctly when hasData is false and loading is true', () => {
      const props = generateProps({ hasData: false, loading: true });

      testRender({ props });
    });

    it('should render correctly when hasData is true and loading is true', () => {
      const props = generateProps({ hasData: true, loading: true });

      testRender({ props });
    });
  });
});
