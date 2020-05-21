import React from 'react';
import { StyledWeatherIcon, WeatherImage } from './WeatherIcon.style';

const WeatherIcon = ({ src, className }) => {
  return (
    <StyledWeatherIcon className={className}>
      <WeatherImage src={src} />
    </StyledWeatherIcon>
  );
};

export default WeatherIcon;
