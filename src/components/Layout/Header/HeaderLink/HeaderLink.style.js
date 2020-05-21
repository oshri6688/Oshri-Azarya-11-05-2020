import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink).attrs({ activeClassName: 'selected', exact: true })`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;

  &.selected {
    color: ${({ theme }) => theme.palette.secondary[theme.palette.type]};
  }
`;

export const LinkLabel = styled.label`
  margin-left: 5px;
  cursor: pointer;
`;
