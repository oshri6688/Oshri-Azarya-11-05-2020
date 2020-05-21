import styled from 'styled-components';
import { Toolbar, IconButton, Typography, MenuItem } from '@material-ui/core';
import HeaderLink from './HeaderLink/HeaderLink';

export const StyledToolbar = styled(Toolbar)`
  white-space: nowrap;
`;

export const StyledIconButton = styled(IconButton)`
  color: inherit;
  padding: 0;
`;

export const Title = styled.span`
  font-size: 20px;
`;

export const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin: 0 20px;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > *:not(:first-child) {
    margin-left: 20px;
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    flex: 1;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-around;
`;

export const MenuItemLabel = styled(Typography).attrs({
  variant: 'p',
  noWrap: true,
})`
  margin-right: 10px;
`;

export const MenuItemLink = styled(HeaderLink)`
  margin-left: 0;
  width: 100%;
`;
