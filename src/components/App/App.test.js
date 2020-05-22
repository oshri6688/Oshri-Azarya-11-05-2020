import React from 'react';
import { mount } from 'enzyme';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';
import GlobalStyle from 'styles/globalStyle/globalStyle';
import { getTheme } from 'styles/theme/theme';
import Layout from 'components/Layout/Layout';
import { getThemeType } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import App from './App';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('styled-components', () => ({
  ThemeProvider: ({ children }) => <div children={children} />,
}));

jest.mock('@material-ui/core/styles', () => ({
  StylesProvider: ({ children }) => <div children={children} />,
}));

jest.mock('@material-ui/core', () => ({
  ThemeProvider: ({ children }) => <div children={children} />,
  CssBaseline: () => <div />,
}));

jest.mock('styles/globalStyle/globalStyle', () => () => <div />);
jest.mock('components/Layout/Layout', () => () => <div />);

jest.mock('styles/theme/theme', () => ({
  getTheme: jest.fn(),
}));

jest.mock('redux/selectors/SettingsSelectors/SettingsSelectors', () => ({
  getThemeType: jest.fn(),
}));

const themeType = 'test-theme-type';
const theme = { test: 'test-theme' };

useSelector.mockReturnValue(themeType);
getTheme.mockReturnValue(theme);

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mounting', () => {
    it('should render correctly', () => {
      const wrapper = mount(<App />);
      const muiThemeProvider = wrapper.find(MuiThemeProvider);
      const themeProvider = muiThemeProvider.find(ThemeProvider);
      const stylesProvider = themeProvider.find(StylesProvider);

      expect(muiThemeProvider).toHaveLength(1);
      expect(muiThemeProvider.prop('theme')).toBe(theme);

      expect(themeProvider).toHaveLength(1);
      expect(themeProvider.prop('theme')).toBe(theme);

      expect(stylesProvider).toHaveLength(1);
      expect(stylesProvider.prop('injectFirst')).toBe(true);

      expect(stylesProvider.exists(CssBaseline)).toBe(true);
      expect(stylesProvider.exists(GlobalStyle)).toBe(true);
      expect(stylesProvider.exists(Layout)).toBe(true);

      expect(useSelector).toBeCalledTimes(1);
      expect(useSelector).toBeCalledWith(getThemeType);

      expect(getTheme).toBeCalledTimes(1);
      expect(getTheme).toBeCalledWith(themeType);
    });
  });
});
