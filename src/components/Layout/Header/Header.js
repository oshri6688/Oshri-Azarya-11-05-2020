import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { AppBar, Tooltip, Menu, Hidden, Divider } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import themeTypes from 'constants/themeTypes';
import { getThemeType } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import { setThemeType } from 'redux/actions/SettingsActions/SettingsActions';
import paths from 'constants/paths';
import TemperatureSwitch from './TemperatureSwitch/TemperatureSwitch';
import HeaderLink from './HeaderLink/HeaderLink';
import {
  StyledToolbar,
  StyledIconButton,
  Title,
  Links,
  Controls,
  StyledMenuItem,
  MenuItemLabel,
  MenuItemLink,
} from './Header.style';

const themeIcons = {
  [themeTypes.LIGHT]: <Icons.Brightness7 />,
  [themeTypes.DARK]: <Icons.Brightness4 />,
};

const Header = () => {
  const [moreButtonAnchorEl, setMoreButtonAnchorEl] = useState(null);
  const themeType = useSelector(getThemeType);
  const dispatch = useDispatch();

  const themeIcon = get(themeIcons, themeType, themeIcons[themeTypes.LIGHT]);

  const onClickMoreButton = (event) => {
    setMoreButtonAnchorEl(event.currentTarget);
  };

  const closeHeaderMenu = () => {
    setMoreButtonAnchorEl(null);
  };

  const onToggleTheme = () => {
    let newThemeType = themeTypes.LIGHT;

    if (themeType === themeTypes.LIGHT) {
      newThemeType = themeTypes.DARK;
    }

    dispatch(setThemeType(newThemeType));
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Title variant="h6">Herolo Weather</Title>

        <Hidden xsDown>
          <Links>
            <HeaderLink to={paths.HOME_PAGE} label="Home" icon={Icons.Home} />

            <HeaderLink to={paths.FAVORITES_PAGE} label="Favorites" icon={Icons.Favorite} />
          </Links>
        </Hidden>

        <Controls>
          <Hidden xsDown>
            <TemperatureSwitch />

            <Tooltip title="Toggle light/dark theme">
              <StyledIconButton onClick={onToggleTheme}>{themeIcon}</StyledIconButton>
            </Tooltip>
          </Hidden>

          <Hidden smUp>
            <StyledIconButton onClick={onClickMoreButton}>
              <Icons.MoreVert />
            </StyledIconButton>
          </Hidden>
        </Controls>

        <Menu anchorEl={moreButtonAnchorEl} open={Boolean(moreButtonAnchorEl)} onClose={closeHeaderMenu}>
          <StyledMenuItem>
            <MenuItemLink to={paths.HOME_PAGE} label="Home" icon={Icons.Home} onClick={closeHeaderMenu} />
          </StyledMenuItem>

          <StyledMenuItem>
            <MenuItemLink to={paths.FAVORITES_PAGE} label="Favorites" icon={Icons.Favorite} onClick={closeHeaderMenu} />
          </StyledMenuItem>

          <Divider />

          <StyledMenuItem>
            <MenuItemLabel>Temperature</MenuItemLabel>
            <TemperatureSwitch />
          </StyledMenuItem>

          <StyledMenuItem>
            <MenuItemLabel>Theme</MenuItemLabel>
            <StyledIconButton onClick={onToggleTheme}>{themeIcon}</StyledIconButton>
          </StyledMenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
