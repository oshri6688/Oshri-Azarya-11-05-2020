import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import WeatherServices from 'services/WeatherServices/WeatherServices';
import useFetchData from 'shared/hooks/useFetchData/useFetchData';

const fetchCurrentWeather = (location) => {
  return WeatherServices.getCurrentWeather(location.id)
    .then((data) => ({
      location,
      currentWeather: data,
    }))
    .catch(() => null);
};

const fetchWeatherLocations = (locations) => {
  const requests = locations.map(fetchCurrentWeather);

  return Promise.all(requests).then((data) => {
    const filteredData = data.filter((item) => !isEmpty(item));

    if (isEmpty(filteredData)) {
      throw new Error(`no results found`);
    }

    return filteredData;
  });
};

const useFavorites = (favoriteLocations) => {
  const weatherLocations = useFetchData({
    fetchData: fetchWeatherLocations,
    dataName: 'favorite weather locations',
    defaultData: [],
  });

  useEffect(() => {
    !isEmpty(favoriteLocations) && weatherLocations.loadData(favoriteLocations);
  }, [favoriteLocations]);

  return {
    weatherLocations: weatherLocations.data,
    isLoading: weatherLocations.isLoading,
  };
};

export default useFavorites;
