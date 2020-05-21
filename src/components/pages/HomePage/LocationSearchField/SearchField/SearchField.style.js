import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const StyledSearchField = styled.div`
  position: relative;
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 100%;
  pointer-events: none;
`;

export const StyledTextField = styled(TextField)`
  padding-left: 72px;
  height: 100%;
`;
