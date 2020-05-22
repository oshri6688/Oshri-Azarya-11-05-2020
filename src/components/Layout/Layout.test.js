import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'components/pages/HomePage/HomePage';
import FavoritesPage from 'components/pages/FavoritesPage/FavoritesPage';
import paths from 'constants/paths';
import Header from './Header/Header';
import { StyledLayout, Content } from './Layout.style';
import Layout from './Layout';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div children={children} />,
  Switch: ({ children }) => <div children={children} />,
  Route: () => <div />,
}));

jest.mock('components/pages/HomePage/HomePage', () => () => <div />);
jest.mock('components/pages/FavoritesPage/FavoritesPage', () => () => <div />);
jest.mock('./Header/Header', () => () => <div />);

const mockDown = '.down';

const theme = {
  breakpoints: {
    down: jest.fn(() => mockDown),
  },
};

const mountWithTheme = (component) => {
  return mount(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mounting', () => {
    it('should render correctly', () => {
      const wrapper = mountWithTheme(<Layout />);
      const router = wrapper.find(Router);
      const styledLayout = router.find(StyledLayout);
      const content = styledLayout.find(Content);
      const switchComponent = content.find(Switch);
      const routes = switchComponent.find(Route);
      const homePageRoute = routes.at(0);
      const favoritesPageRoute = routes.at(1);

      expect(theme.breakpoints.down).toBeCalledTimes(1);
      expect(theme.breakpoints.down).toBeCalledWith('xs');

      expect(router).toHaveLength(1);

      expect(styledLayout).toHaveLength(1);
      expect(styledLayout.exists(Header)).toBe(true);

      expect(content).toHaveLength(1);
      expect(content).toHaveStyleRule('padding', '10px', {
        modifier: mockDown,
      });

      expect(switchComponent).toHaveLength(1);

      expect(routes).toHaveLength(2);

      expect(homePageRoute).toHaveLength(1);
      expect(homePageRoute.prop('path')).toBe(paths.HOME_PAGE);
      expect(homePageRoute.prop('exact')).toBe(true);
      expect(homePageRoute.prop('component')).toBe(HomePage);

      expect(favoritesPageRoute).toHaveLength(1);
      expect(favoritesPageRoute.prop('path')).toBe(paths.FAVORITES_PAGE);
      expect(favoritesPageRoute.prop('exact')).toBe(true);
      expect(favoritesPageRoute.prop('component')).toBe(FavoritesPage);
    });
  });
});
