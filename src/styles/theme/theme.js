import themeTypes from 'constants/themeTypes';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const customDarkTheme = {
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#212121',
      },
    },
  },
};

export const themes = {
  [themeTypes.LIGHT]: createMuiTheme(),
  [themeTypes.DARK]: createMuiTheme(customDarkTheme),
};

export const getTheme = (themeType) => responsiveFontSizes(themes[themeType]);
