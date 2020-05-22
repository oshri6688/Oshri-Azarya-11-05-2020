import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { Link, LinkLabel } from './HeaderLink.style';
import HeaderLink from './HeaderLink';

jest.mock('react-router-dom', () => ({
  NavLink: ({ children, className }) => <div children={children} className={className} />,
}));

const selectedColor = 'red';
const paletteType = 'test-palette-type';

const theme = {
  palette: {
    type: paletteType,
    secondary: {
      [paletteType]: selectedColor,
    },
  },
};

const mountWithTheme = (component) => {
  return mount(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const props = {
  label: 'test-label',
  icon: () => <div />,
  testProp: 'test-prop',
};

describe('HeaderLink', () => {
  describe('mounting', () => {
    it('should render correctly', () => {
      const wrapper = mountWithTheme(<HeaderLink {...props} />);
      const link = wrapper.find(Link);
      const linkLabel = link.find(LinkLabel);

      const { label, icon, testProp } = props;

      expect(link).toHaveLength(1);
      expect(link.prop('testProp')).toBe(testProp);
      expect(link.exists(icon)).toBe(true);

      expect(link).toHaveStyleRule('color', selectedColor, {
        modifier: '&.selected',
      });

      expect(linkLabel).toHaveLength(1);
      expect(linkLabel.text()).toBe(label);
    });
  });
});
