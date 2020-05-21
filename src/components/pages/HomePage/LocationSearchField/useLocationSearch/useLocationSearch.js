import WeatherServices from 'services/WeatherServices/WeatherServices';
import useFetchData from 'shared/hooks/useFetchData/useFetchData';
import { useState, useEffect } from 'react';

const useLocationSearch = (onSelect) => {
  const [inputValue, setInputValue] = useState('');

  const autoCompleteLocations = useFetchData({
    fetchData: WeatherServices.getAutoCompleteLocations,
    dataName: 'autoComplete locations',
    defaultData: [],
    updateLoadingOnlyWhenDataEmpty: true,
    clearDataOnlyWhenFetchFailed: true,
  });

  const onInputChange = () => {
    if (inputValue.length >= 2) {
      autoCompleteLocations.loadData(inputValue);
    } else {
      autoCompleteLocations.clearData();
    }
  };

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      WeatherServices.getLocationByGeoPosition(latitude, longitude).then((geolocation) => onSelect(geolocation));
    });
  };

  useEffect(() => {
    const id = setTimeout(() => onInputChange(), 500);

    return () => clearTimeout(id);
  }, [inputValue]);

  return {
    locations: autoCompleteLocations.data,
    isLoading: autoCompleteLocations.isLoading,
    setInputValue,
    useMyLocation,
  };
};

export default useLocationSearch;
