import React from 'react';
import moment from 'moment';
import { Typography, Tooltip, Hidden } from '@material-ui/core';
import WeatherIcon from 'shared/components/WeatherIcon/WeatherIcon';
import WeatherTemperature from 'shared/components/WeatherTemperature/WeatherTemperature';
import { StyledWeatherItem, TemperatureWrapper } from './WeatherItem.style';

const WeatherItem = ({ item }) => {
  const day = moment.unix(item.timestamp).format('ddd');

  return (
    <Tooltip title={item.text} placement="top" arrow>
      <StyledWeatherItem elevation={3}>
        <Typography variant="h6">{day}</Typography>

        <WeatherIcon src={item.icon} />

        <TemperatureWrapper>
          <WeatherTemperature temperature={item.minTemperature} />
          <WeatherTemperature temperature={item.maxTemperature} color="textSecondary" />
        </TemperatureWrapper>

        <Hidden smUp>
          <Typography variant="h6">{item.text}</Typography>
        </Hidden>
      </StyledWeatherItem>
    </Tooltip>
  );
};

export default WeatherItem;
