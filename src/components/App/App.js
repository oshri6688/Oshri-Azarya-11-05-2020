import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';
import GlobalStyle from 'styles/globalStyle';
import { getTheme } from 'styles/theme';
import Layout from 'components/Layout/Layout';
import { getThemeType } from 'redux/selectors/SettingsSelectors/SettingsSelectors';

const App = () => {
  const themeType = useSelector(getThemeType);
  const theme = getTheme(themeType);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />

          <GlobalStyle />

          <Layout />
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
