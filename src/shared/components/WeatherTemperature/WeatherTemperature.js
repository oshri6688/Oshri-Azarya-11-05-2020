import React from 'react';
import { useSelector } from 'react-redux';
import { getTemperatureUnit } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import { StyledWeatherTemperature } from './WeatherTemperature.style';

const WeatherTemperature = ({ temperature, ...props }) => {
  const temperatureUnit = useSelector(getTemperatureUnit);
  const temperatureNumber = parseFloat(temperature[temperatureUnit]).toFixed(1);

  return (
    <StyledWeatherTemperature component="span" {...props}>
      {temperatureNumber}
    </StyledWeatherTemperature>
  );
};

export default WeatherTemperature;
