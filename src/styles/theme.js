import themeTypes from 'constants/themeTypes';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const themes = {
  [themeTypes.LIGHT]: createMuiTheme(),
  [themeTypes.DARK]: createMuiTheme({
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
  }),
};

export const getTheme = (themeType) => responsiveFontSizes(themes[themeType]);
