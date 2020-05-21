import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import paths from 'constants/paths';
import WeatherIcon from 'shared/components/WeatherIcon/WeatherIcon';
import { StyledFavoriteItem, WeatherTemperatureWrapper, StyledWeatherTemperature } from './FavoriteItem.style';

const FavoriteItem = ({ weather }) => {
  let history = useHistory();
  const { location, currentWeather } = weather;

  const onClick = () => {
    history.push(paths.HOME_PAGE, location);
  };

  return (
    <StyledFavoriteItem elevation={3} onClick={onClick}>
      <Typography variant="h5">{location.city}</Typography>
      <Typography variant="h6" color="textSecondary">
        {location.administrativeArea}, {location.country}
      </Typography>

      <WeatherTemperatureWrapper>
        <WeatherIcon src={currentWeather.icon} />

        <StyledWeatherTemperature temperature={currentWeather.temperature} />
      </WeatherTemperatureWrapper>

      <Typography variant="h5">{currentWeather.text}</Typography>
    </StyledFavoriteItem>
  );
};

export default FavoriteItem;
