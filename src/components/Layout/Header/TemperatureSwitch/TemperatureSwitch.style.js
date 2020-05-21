import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const TemperatureButton = styled(Button).attrs({
  variant: 'contained',
  disableRipple: true,
  disableElevation: true,
})`
  border-radius: 0;
  padding: 0;
  min-width: 30px;
  overflow: hidden;
`;

export const StyledTemperatureSwitch = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  overflow: hidden;

  ${TemperatureButton} {
    :first-child {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }

    :last-child {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  }
`;
