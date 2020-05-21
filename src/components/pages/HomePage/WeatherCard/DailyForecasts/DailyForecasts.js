import React from 'react';
import WeatherItem from './WeatherItem/WeatherItem';
import { StyledDailyForecasts } from './DailyForecasts.style';

const DailyForecasts = ({ items }) => {
  return (
    <StyledDailyForecasts>
      {items.map((item) => (
        <WeatherItem key={item.timestamp} item={item} />
      ))}
    </StyledDailyForecasts>
  );
};

export default DailyForecasts;
