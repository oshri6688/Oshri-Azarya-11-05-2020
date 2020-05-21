import React, { useState } from 'react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import DataWidget from 'shared/components/DataWidget/DataWidget';
import { StyledHomePage } from './HomePage.style';
import LocationSearchField from './LocationSearchField/LocationSearchField';
import WeatherCard from './WeatherCard/WeatherCard';
import useWeather from './useWeather/useWeather';

const HomePage = () => {
  const routerLocation = useRouterLocation();
  const [selectedLocation, setSelectedLocation] = useState(routerLocation.state);
  const { weather, isLoading } = useWeather(selectedLocation);

  return (
    <StyledHomePage>
      <LocationSearchField onSelect={setSelectedLocation} />

      <DataWidget loading={isLoading} hasData={!isEmpty(weather)} noDataMessage="No Location Selected">
        <WeatherCard weather={weather} />
      </DataWidget>
    </StyledHomePage>
  );
};

export default HomePage;
