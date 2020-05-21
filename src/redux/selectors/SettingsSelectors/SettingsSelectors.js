import { createSelector, defaultMemoize } from 'reselect';

export const getSettings = (state) => state.settings;

export const getThemeType = createSelector(getSettings, (settings) => settings.themeType);

export const getTemperatureUnit = createSelector(getSettings, (settings) => settings.temperatureUnit);

export const getFavorites = createSelector(getSettings, (settings) => settings.favorites);

export const isFavoriteLocation = defaultMemoize((locationId) => {
  return createSelector(getFavorites, (favorites) => favorites.some((location) => location.id === locationId));
});
