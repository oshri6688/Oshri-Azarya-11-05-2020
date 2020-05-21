import React from 'react';
import { mount } from 'enzyme';
import { StyledWeatherIcon, WeatherImage } from './WeatherIcon.style';
import WeatherIcon from './WeatherIcon';

const props = {
  src: 'test-src',
  className: 'test-class-name',
};

describe('WeatherIcon', () => {
  describe('mounting', () => {
    it('should render correctly', () => {
      const wrapper = mount(<WeatherIcon {...props} />);
      const styledWeatherIcon = wrapper.find(StyledWeatherIcon);
      const weatherImage = styledWeatherIcon.find(WeatherImage);

      const { src, className } = props;

      expect(styledWeatherIcon).toHaveLength(1);
      expect(styledWeatherIcon.prop('className')).toBe(className);

      expect(weatherImage).toHaveLength(1);
      expect(weatherImage.prop('src')).toBe(src);
    });
  });
});
