import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'components/pages/HomePage/HomePage';
import FavoritesPage from 'components/pages/FavoritesPage/FavoritesPage';
import paths from 'constants/paths';
import { StyledLayout, Content } from './Layout.style';
import Header from './Header/Header';

const Layout = () => {
  return (
    <Router>
      <StyledLayout>
        <Header />

        <Content>
          <Switch>
            <Switch>
              <Route path={paths.HOME_PAGE} exact={true} component={HomePage} />

              <Route path={paths.FAVORITES_PAGE} exact={true} component={FavoritesPage} />
            </Switch>
          </Switch>
        </Content>
      </StyledLayout>
    </Router>
  );
};

export default Layout;
