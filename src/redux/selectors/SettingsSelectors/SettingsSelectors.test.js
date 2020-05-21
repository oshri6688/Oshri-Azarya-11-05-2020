import { getSettings, getThemeType, getTemperatureUnit, getFavorites, isFavoriteLocation } from './SettingsSelectors';

const location = {
  id: 'test-location-id',
};

const settings = {
  themeType: 'test-theme-type',
  temperatureUnit: 'test-temperature-unit',
  favorites: [location],
};

const state = {
  settings,
};

describe('SettingsSelectors', () => {
  describe('getSettings', () => {
    it('should return state.settings', () => {
      const result = getSettings(state);

      expect(result).toBe(settings);
    });
  });

  describe('getThemeType', () => {
    it('should return state.settings.themeType', () => {
      const result = getThemeType(state);

      expect(result).toBe(settings.themeType);
    });
  });

  describe('getTemperatureUnit', () => {
    it('should return state.settings.temperatureUnit', () => {
      const result = getTemperatureUnit(state);

      expect(result).toBe(settings.temperatureUnit);
    });
  });

  describe('getFavorites', () => {
    it('should return state.settings.favorites', () => {
      const result = getFavorites(state);

      expect(result).toBe(settings.favorites);
    });
  });

  describe('isFavoriteLocation', () => {
    it('should return true when locationId exits in favorites', () => {
      const result = isFavoriteLocation(location.id)(state);

      expect(result).toBe(true);
    });

    it('should return false when locationId NOT exits in favorites', () => {
      const result = isFavoriteLocation(null)(state);

      expect(result).toBe(false);
    });
  });
});
