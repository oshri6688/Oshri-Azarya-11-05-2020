import axios from 'axios';
import dataUtils from 'utils/dataUtils/dataUtils';
import temperatureUnits from 'constants/temperatureUnits';
import temperatureUtils from 'utils/temperatureUtils/temperatureUtils';
import WeatherServices, { weatherUrl, weatherIconsUrl, defaultParams } from './WeatherServices';

jest.mock('axios');
jest.mock('utils/temperatureUtils/temperatureUtils');

jest.mock('utils/dataUtils/dataUtils', () => {
  const getData = jest.fn((res) => res.data);

  return {
    getData,
    getDataList: getData,
  };
});

const mockConvertToFahrenheit = (celsius) => `test-fahrenheit-${celsius}`;

temperatureUtils.convertToFahrenheit.mockImplementation(mockConvertToFahrenheit);

describe('WeatherServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLocationByGeoPosition', () => {
    const mockResponseData = {
      Key: 'test-key',
      EnglishName: 'test-english-name',
      Country: {
        EnglishName: 'test-country-english-name',
      },
      AdministrativeArea: {
        ID: 'test-administrative-area-id',
      },
    };

    it('should return location by geo position', async () => {
      const latitude = 'test-latitude';
      const longitude = 'test-longitude';
      const expectedConfig = { params: { q: `${latitude},${longitude}`, ...defaultParams } };
      const expectedUrl = `${weatherUrl}/locations/v1/cities/geoposition/search`;
      const expectedResult = {
        id: mockResponseData.Key,
        city: mockResponseData.EnglishName,
        country: mockResponseData.Country.EnglishName,
        administrativeArea: mockResponseData.AdministrativeArea.ID,
      };

      const mockResponse = { data: mockResponseData };

      axios.get.mockResolvedValueOnce(mockResponse);

      const result = WeatherServices.getLocationByGeoPosition(latitude, longitude);

      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toBeCalledWith(expectedUrl, expectedConfig);

      await expect(result).resolves.toEqual(expectedResult);

      expect(dataUtils.getData).toBeCalledTimes(1);
      expect(dataUtils.getData).toBeCalledWith(mockResponse);
    });
  });

  describe('getAutoCompleteLocations', () => {
    const mockResponseData = [
      {
        Key: 'test-key-1',
        LocalizedName: 'test-localized-name-1',
        Country: {
          LocalizedName: 'test-country-localized-name-1',
        },
        AdministrativeArea: {
          ID: 'test-administrative-area-id-1',
        },
      },
      {
        Key: 'test-key-2',
        LocalizedName: 'test-localized-name-2',
        Country: {
          LocalizedName: 'test-country-localized-name-2',
        },
        AdministrativeArea: {
          ID: 'test-administrative-area-id-2',
        },
      },
    ];

    it('should return autocomplete locations', async () => {
      const query = 'test-query';
      const expectedConfig = { params: { q: query, ...defaultParams } };
      const expectedUrl = `${weatherUrl}/locations/v1/cities/autocomplete`;
      const expectedResult = mockResponseData.map((data) => ({
        id: data.Key,
        city: data.LocalizedName,
        country: data.Country.LocalizedName,
        administrativeArea: data.AdministrativeArea.ID,
      }));

      const mockResponse = { data: mockResponseData };

      axios.get.mockResolvedValueOnce(mockResponse);

      const result = WeatherServices.getAutoCompleteLocations(query);

      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toBeCalledWith(expectedUrl, expectedConfig);

      await expect(result).resolves.toEqual(expectedResult);

      expect(dataUtils.getDataList).toBeCalledTimes(1);
      expect(dataUtils.getDataList).toBeCalledWith(mockResponse);
    });
  });

  describe('getCurrentWeather', () => {
    const mockResponseData = [
      {
        EpochTime: 'test-epoch-time',
        WeatherText: 'test-Weather-text',
        WeatherIcon: 'test-weather-icon',
        Temperature: {
          Metric: {
            Value: 'test-temperature-metric-value',
          },
          Imperial: {
            Value: 'test-temperature-imperial-value',
          },
        },
      },
    ];

    it('should return current weather', async () => {
      const locationId = 'test-location-id';
      const expectedConfig = { params: defaultParams };
      const expectedUrl = `${weatherUrl}/currentconditions/v1/${locationId}`;
      const expectedResult = {
        timestamp: mockResponseData[0].EpochTime,
        text: mockResponseData[0].WeatherText,
        icon: `${weatherIconsUrl}/${mockResponseData[0].WeatherIcon}.svg`,
        temperature: {
          [temperatureUnits.CELSIUS]: mockResponseData[0].Temperature.Metric.Value,
          [temperatureUnits.FAHRENHEIT]: mockResponseData[0].Temperature.Imperial.Value,
        },
      };

      const mockResponse = { data: mockResponseData };

      axios.get.mockResolvedValueOnce(mockResponse);

      const result = WeatherServices.getCurrentWeather(locationId);

      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toBeCalledWith(expectedUrl, expectedConfig);

      await expect(result).resolves.toEqual(expectedResult);

      expect(dataUtils.getDataList).toBeCalledTimes(1);
      expect(dataUtils.getDataList).toBeCalledWith(mockResponse);
    });
  });

  describe('getFiveDayForecasts', () => {
    const mockResponseData = {
      DailyForecasts: [
        {
          EpochDate: 'test-epoch-date-1',
          Temperature: {
            Minimum: {
              Value: 'test-temperature-minimum-value-1',
            },
            Maximum: {
              Value: 'test-temperature-maximum-value-1',
            },
          },
          Day: {
            Icon: 'test-day-icon-1',
            IconPhrase: 'test-day-icon-phrase-1',
          },
        },
        {
          EpochDate: 'test-epoch-date-2',
          Temperature: {
            Minimum: {
              Value: 'test-temperature-minimum-value-2',
            },
            Maximum: {
              Value: 'test-temperature-maximum-value-2',
            },
          },
          Day: {
            Icon: 'test-day-icon-2',
            IconPhrase: 'test-day-icon-phrase-2',
          },
        },
      ],
    };

    it('should return autocomplete locations', async () => {
      const locationId = 'test-location-id';
      const expectedConfig = { params: defaultParams };
      const expectedUrl = `${weatherUrl}/forecasts/v1/daily/5day/${locationId}`;
      const expectedResult = mockResponseData.DailyForecasts.map((forecastData) => {
        const minCelsius = forecastData.Temperature.Minimum.Value;
        const maxCelsius = forecastData.Temperature.Maximum.Value;

        return {
          timestamp: forecastData.EpochDate,
          text: forecastData.Day.IconPhrase,
          icon: `${weatherIconsUrl}/${forecastData.Day.Icon}.svg`,
          minTemperature: {
            [temperatureUnits.CELSIUS]: minCelsius,
            [temperatureUnits.FAHRENHEIT]: mockConvertToFahrenheit(minCelsius),
          },

          maxTemperature: {
            [temperatureUnits.CELSIUS]: maxCelsius,
            [temperatureUnits.FAHRENHEIT]: mockConvertToFahrenheit(maxCelsius),
          },
        };
      });

      const mockResponse = { data: mockResponseData };

      axios.get.mockResolvedValueOnce(mockResponse);

      const result = WeatherServices.getFiveDayForecasts(locationId);

      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toBeCalledWith(expectedUrl, expectedConfig);

      await expect(result).resolves.toEqual(expectedResult);

      expect(dataUtils.getData).toBeCalledTimes(1);
      expect(dataUtils.getData).toBeCalledWith(mockResponse);

      const callNumberPerForecastData = 2;

      expect(temperatureUtils.convertToFahrenheit).toBeCalledTimes(
        mockResponseData.DailyForecasts.length * callNumberPerForecastData
      );

      mockResponseData.DailyForecasts.forEach((forecastData, index) => {
        const callNumber = index * callNumberPerForecastData + 1;
        const minCelsius = forecastData.Temperature.Minimum.Value;
        const maxCelsius = forecastData.Temperature.Maximum.Value;

        expect(temperatureUtils.convertToFahrenheit).nthCalledWith(callNumber, minCelsius);
        expect(temperatureUtils.convertToFahrenheit).nthCalledWith(callNumber + 1, maxCelsius);
      });
    });
  });
});
