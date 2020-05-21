import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const StyledWeatherItem = styled(Paper)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(50px, 1fr) auto;
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: 50px 50px 1fr 1fr;
    grid-template-rows: 100%;
    grid-gap: 10px;
  }
`;

export const TemperatureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  & > * {
    margin: 0 5px;
  }
`;
