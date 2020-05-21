import { useEffect, useState } from 'react';
import WeatherServices from 'services/WeatherServices/WeatherServices';
import useFetchData from 'shared/hooks/useFetchData/useFetchData';

const fetchWeather = (location) => {
  const currentWeatherRequest = WeatherServices.getCurrentWeather(location.id);
  const dailyForecastsRequest = WeatherServices.getFiveDayForecasts(location.id);

  return Promise.all([currentWeatherRequest, dailyForecastsRequest]).then(([currentWeather, dailyForecasts]) => ({
    location,
    currentWeather,
    dailyForecasts,
  }));
};

const useWeather = (location) => {
  const weather = useFetchData({
    fetchData: fetchWeather,
    dataName: 'weather',
    defaultData: null,
  });

  useEffect(() => {
    if (location) {
      weather.loadData(location);
    } else {
      weather.clearData();
    }
  }, [location]);

  return {
    weather: weather.data,
    isLoading: weather.isLoading,
  };
};

export default useWeather;
