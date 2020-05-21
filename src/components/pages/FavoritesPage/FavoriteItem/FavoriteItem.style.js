import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import WeatherTemperature from 'shared/components/WeatherTemperature/WeatherTemperature';

export const StyledFavoriteItem = styled(Paper)`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: auto auto 60px auto;
  justify-items: center;
  align-items: center;
  text-align: center;
  grid-gap: 5px;
  padding: 10px;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const WeatherTemperatureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
`;

export const StyledWeatherTemperature = styled(WeatherTemperature)`
  font-size: 40px;
  margin-left: 15px;
`;
