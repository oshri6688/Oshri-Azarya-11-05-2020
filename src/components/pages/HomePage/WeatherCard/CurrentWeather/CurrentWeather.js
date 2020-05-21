import React from 'react';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import WeatherIcon from 'shared/components/WeatherIcon/WeatherIcon';
import {
  StyledCurrentWeather,
  CurrentWeatherDetails,
  StyledWeatherTemperature,
  WeatherTemperatureWrapper,
} from './CurrentWeather.style';

const CurrentWeather = ({ location, currentWeather }) => {
  const day = moment.unix(currentWeather.timestamp).format('dddd');

  return (
    <StyledCurrentWeather>
      <div>
        <Typography variant="h3">{location.city}</Typography>
        <Typography variant="h5" color="textSecondary">
          {location.administrativeArea}, {location.country}
        </Typography>

        <Typography variant="h4">{day}</Typography>
      </div>

      <CurrentWeatherDetails>
        <Typography variant="h3">{currentWeather.text}</Typography>

        <WeatherTemperatureWrapper>
          <WeatherIcon src={currentWeather.icon} />

          <StyledWeatherTemperature temperature={currentWeather.temperature} />
        </WeatherTemperatureWrapper>
      </CurrentWeatherDetails>
    </StyledCurrentWeather>
  );
};

export default CurrentWeather;
