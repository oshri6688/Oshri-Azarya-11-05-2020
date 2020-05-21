import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { isFavoriteLocation } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import { toggleFavoriteLocation } from 'redux/actions/SettingsActions/SettingsActions';
import DailyForecasts from './DailyForecasts/DailyForecasts';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import { StyledWeatherCard, WeatherCardContent, FavoriteButton } from './WeatherCard.style';

const WeatherCard = ({ weather }) => {
  const { location, currentWeather, dailyForecasts } = weather;
  const isFavorite = useSelector(isFavoriteLocation(location.id));
  const dispatch = useDispatch();

  const onFavoriteButtonClick = () => {
    dispatch(toggleFavoriteLocation(location));
  };

  return (
    <StyledWeatherCard>
      <Tooltip title="Add to Favorites">
        <FavoriteButton isFavorite={isFavorite} onClick={onFavoriteButtonClick}>
          <Icons.Favorite fontSize="large" />
        </FavoriteButton>
      </Tooltip>

      <WeatherCardContent>
        <CurrentWeather location={location} currentWeather={currentWeather} />

        <DailyForecasts items={dailyForecasts} />
      </WeatherCardContent>
    </StyledWeatherCard>
  );
};

export default WeatherCard;
