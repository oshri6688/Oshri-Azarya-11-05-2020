import React from 'react';
import { mount } from 'enzyme';
import { useSelector } from 'react-redux';
import temperatureUnits from 'constants/temperatureUnits';
import { getTemperatureUnit } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import { StyledWeatherTemperature } from './WeatherTemperature.style';
import WeatherTemperature from './WeatherTemperature';

jest.mock('@material-ui/core', () => ({
  Typography: ({ children, className }) => <div children={children} className={className} />,
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('redux/selectors/SettingsSelectors/SettingsSelectors', () => ({
  getTemperatureUnit: jest.fn(),
}));

const temperatureUnit = temperatureUnits.CELSIUS;
const temperatureNumber = 11.111;

const props = {
  temperature: { [temperatureUnit]: temperatureNumber },
  testProp: 'test-prop',
};

useSelector.mockReturnValue(temperatureUnit);

describe('WeatherTemperature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mounting', () => {
    it('should render correctly', () => {
      const wrapper = mount(<WeatherTemperature {...props} />);
      const styledWeatherTemperature = wrapper.find(StyledWeatherTemperature);

      const { testProp } = props;
      const expectedTemperatureNumber = parseFloat(temperatureNumber).toFixed(1);

      expect(styledWeatherTemperature).toHaveLength(1);
      expect(styledWeatherTemperature.prop('component')).toBe('span');
      expect(styledWeatherTemperature.prop('testProp')).toBe(testProp);

      expect(styledWeatherTemperature.text()).toBe(expectedTemperatureNumber);

      expect(useSelector).toBeCalledTimes(1);
      expect(useSelector).toBeCalledWith(getTemperatureUnit);
    });
  });
});
