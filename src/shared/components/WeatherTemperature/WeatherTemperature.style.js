import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const StyledWeatherTemperature = styled(Typography)`
  &:after {
    content: '°';
  }
`;
