import temperatureUtils from './temperatureUtils';

describe('temperatureUtils', () => {
  describe('convertToFahrenheit', () => {
    it('should convert correctly', () => {
      const celsius = 0;
      const expectedResult = 32;

      const result = temperatureUtils.convertToFahrenheit(celsius);

      expect(result).toBe(expectedResult);
    });
  });
});
