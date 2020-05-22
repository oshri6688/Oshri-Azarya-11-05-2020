import themeTypes from 'constants/themeTypes';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { createModuleLoader } from 'utils/TestUtils/TestUtils';

jest.mock('@material-ui/core');

const requireThemeModule = createModuleLoader(() => require('./theme'));

const mockLightTheme = { test: 'test-light-theme' };
const mockDarkTheme = { test: 'test-dark-theme' };

const mockResponsiveTheme = { test: 'test-responsive-theme' };

responsiveFontSizes.mockImplementation(() => mockResponsiveTheme);

const { customDarkTheme } = requireThemeModule();

describe('theme', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    createMuiTheme.mockReturnValueOnce(mockLightTheme).mockReturnValueOnce(mockDarkTheme);
  });

  describe('themes', () => {
    it('should create themes correctly', () => {
      const { themes } = requireThemeModule();
      const expectedThemes = {
        [themeTypes.LIGHT]: mockLightTheme,
        [themeTypes.DARK]: mockDarkTheme,
      };

      expect(createMuiTheme).toBeCalledTimes(2);
      expect(createMuiTheme).nthCalledWith(1);
      expect(createMuiTheme).nthCalledWith(2, customDarkTheme);

      expect(themes).toEqual(expectedThemes);
    });
  });

  describe('getTheme', () => {
    it('should return theme correctly when themeType is themeTypes.LIGHT', () => {
      const { getTheme } = requireThemeModule();

      const result = getTheme(themeTypes.LIGHT);

      expect(responsiveFontSizes).toBeCalledTimes(1);
      expect(responsiveFontSizes).toBeCalledWith(mockLightTheme);

      expect(result).toEqual(mockResponsiveTheme);
    });

    it('should return theme correctly when themeType is themeTypes.DARK', () => {
      const { getTheme } = requireThemeModule();

      const result = getTheme(themeTypes.DARK);

      expect(responsiveFontSizes).toBeCalledTimes(1);
      expect(responsiveFontSizes).toBeCalledWith(mockDarkTheme);

      expect(result).toEqual(mockResponsiveTheme);
    });
  });
});
