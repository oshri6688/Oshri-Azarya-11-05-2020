import axios from 'axios';
import { get } from 'lodash';
import dataUtils from 'utils/dataUtils/dataUtils';
import temperatureUnits from 'constants/temperatureUnits';
import temperatureUtils from 'utils/temperatureUtils/temperatureUtils';
// import { autoCompleteLocationsMock, currentWeatherMock, fiveDayForecastsMock, geoLocationMock } from './MockResponse';

// TODO remove mocks
const weatherUrl = 'https://dataservice.accuweather.com';
const weatherIconsUrl = 'https://vortex.accuweather.com/adc2010/images/slate/icons';

const defaultParams = {
  apikey: 'BFuoqwlacoAXxCR09HfAIG4j8vexFjII',
  language: 'en-us',
};

const getWeatherIconUrl = (iconId) => `${weatherIconsUrl}/${iconId}.svg`;

const getLocationByGeoPosition = (latitude, longitude) => {
  const params = { q: `${latitude},${longitude}`, ...defaultParams };

  return axios.get(`${weatherUrl}/locations/v1/cities/geoposition/search`, { params }).then((res) => {
    const data = dataUtils.getData(res);

    return {
      id: get(data, 'Key'),
      city: get(data, 'EnglishName'),
      country: get(data, 'Country.EnglishName'),
      administrativeArea: get(data, 'AdministrativeArea.ID'),
    };
  });

  // return Promise.resolve(geoLocationMock).then((res) => {
  //   const data = dataUtils.getData(res);

  //   return {
  //     id: get(data, 'Key'),
  //     city: get(data, 'EnglishName'),
  //     country: get(data, 'Country.EnglishName'),
  //     administrativeArea: get(data, 'AdministrativeArea.ID'),
  //   };
  // });
};

const getAutoCompleteLocations = (query) => {
  const params = { q: query, ...defaultParams };

  return axios.get(`${weatherUrl}/locations/v1/cities/autocomplete`, { params }).then((res) => {
    const data = dataUtils.getDataList(res);
    const locations = data.map((locationData) => ({
      id: get(locationData, 'Key'),
      city: get(locationData, 'LocalizedName'),
      country: get(locationData, 'Country.LocalizedName'),
      administrativeArea: get(locationData, 'AdministrativeArea.ID'),
    }));

    return locations;
  });

  // return Promise.resolve(autoCompleteLocationsMock).then((res) => {
  //   const data = dataUtils.getDataList(res);
  //   const locations = data.map((locationData) => ({
  //     id: get(locationData, 'Key'),
  //     city: get(locationData, 'LocalizedName'),
  //     country: get(locationData, 'Country.LocalizedName'),
  //     administrativeArea: get(locationData, 'AdministrativeArea.ID'),
  //   }));

  //   return locations;
  // });
};

const getCurrentWeather = (locationId) => {
  return axios.get(`${weatherUrl}/currentconditions/v1/${locationId}`, { params: defaultParams }).then((res) => {
    const data = dataUtils.getDataList(res);
    const weatherData = data[0];
    const weatherIcon = get(weatherData, 'WeatherIcon');
    return {
      timestamp: get(weatherData, 'EpochTime'),
      text: get(weatherData, 'WeatherText'),
      icon: getWeatherIconUrl(weatherIcon),
      temperature: {
        [temperatureUnits.CELSIUS]: get(weatherData, 'Temperature.Metric.Value'),
        [temperatureUnits.FAHRENHEIT]: get(weatherData, 'Temperature.Imperial.Value'),
      },
    };
  });

  // return Promise.resolve(currentWeatherMock).then((res) => {
  //   const data = dataUtils.getDataList(res);
  //   const weatherData = data[0];
  //   const weatherIcon = get(weatherData, 'WeatherIcon');

  //   return {
  //     timestamp: get(weatherData, 'EpochTime'),
  //     text: get(weatherData, 'WeatherText'),
  //     icon: getWeatherIconUrl(weatherIcon),
  //     temperature: {
  //       [temperatureUnits.CELSIUS]: get(weatherData, 'Temperature.Metric.Value'),
  //       [temperatureUnits.FAHRENHEIT]: get(weatherData, 'Temperature.Imperial.Value'),
  //     },
  //   };
  // });
};

const getFiveDayForecasts = (locationId) => {
  return axios.get(`${weatherUrl}/forecasts/v1/daily/5day/${locationId}`, { params: defaultParams }).then((res) => {
    const data = dataUtils.getData(res);
    const dailyForecastsData = get(data, 'DailyForecasts', []);

    const dailyForecasts = dailyForecastsData.map((forecastData) => {
      const weatherIcon = get(forecastData, 'Day.Icon');
      const minCelsius = get(forecastData, 'Temperature.Minimum.Value');
      const maxCelsius = get(forecastData, 'Temperature.Maximum.Value');

      return {
        timestamp: get(forecastData, 'EpochDate'),
        text: get(forecastData, 'Day.IconPhrase'),
        icon: getWeatherIconUrl(weatherIcon),
        minTemperature: {
          [temperatureUnits.CELSIUS]: minCelsius,
          [temperatureUnits.FAHRENHEIT]: temperatureUtils.convertToFahrenheit(minCelsius),
        },

        maxTemperature: {
          [temperatureUnits.CELSIUS]: maxCelsius,
          [temperatureUnits.FAHRENHEIT]: temperatureUtils.convertToFahrenheit(maxCelsius),
        },
      };
    });

    return dailyForecasts;
  });

  // return Promise.resolve(fiveDayForecastsMock).then((res) => {
  //   const data = dataUtils.getData(res);
  //   const dailyForecastsData = get(data, 'DailyForecasts', []);

  //   const dailyForecasts = dailyForecastsData.map((forecastData) => {
  //     const weatherIcon = get(forecastData, 'Day.Icon');
  //     const minCelsius = get(forecastData, 'Temperature.Minimum.Value');
  //     const maxCelsius = get(forecastData, 'Temperature.Maximum.Value');

  //     return {
  //       timestamp: get(forecastData, 'EpochDate'),
  //       text: get(forecastData, 'Day.IconPhrase'),
  //       icon: getWeatherIconUrl(weatherIcon),
  //       minTemperature: {
  //         [temperatureUnits.CELSIUS]: minCelsius,
  //         [temperatureUnits.FAHRENHEIT]: temperatureUtils.convertToFahrenheit(minCelsius),
  //       },

  //       maxTemperature: {
  //         [temperatureUnits.CELSIUS]: maxCelsius,
  //         [temperatureUnits.FAHRENHEIT]: temperatureUtils.convertToFahrenheit(maxCelsius),
  //       },
  //     };
  //   });

  //   return dailyForecasts;
  // });
};

export default {
  getLocationByGeoPosition,
  getAutoCompleteLocations,
  getCurrentWeather,
  getFiveDayForecasts,
};
