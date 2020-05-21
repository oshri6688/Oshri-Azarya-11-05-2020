import { SET_FAVORITES, SET_THEME_TYPE, SET_TEMPERATURE_UNIT } from 'redux/actionsTypes/SettingsActionsTypes';
import { getFavorites } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import storageUtils from 'utils/storageUtils/storageUtils';
import storageItems from 'constants/storageItems';

export const setTemperatureUnit = (unit) => {
  storageUtils.setItem(storageItems.TEMPERATURE_UNIT, unit);

  return { type: SET_TEMPERATURE_UNIT, temperatureUnit: unit };
};

export const setThemeType = (type) => {
  storageUtils.setItem(storageItems.THEME_TYPE, type);

  return { type: SET_THEME_TYPE, themeType: type };
};

export const setFavorites = (favorites) => {
  storageUtils.setItem(storageItems.FAVORITES, favorites);

  return { type: SET_FAVORITES, favorites };
};

export const toggleFavoriteLocation = (location) => {
  return (dispatch, getState) => {
    const state = getState();
    const favorites = getFavorites(state);
    const favoriteIndex = favorites.findIndex((favoriteLocation) => favoriteLocation.id === location.id);
    const newFavorites = [...favorites];

    if (favoriteIndex >= 0) {
      newFavorites.splice(favoriteIndex, 1);
    } else {
      newFavorites.push(location);
    }

    dispatch(setFavorites(newFavorites));
  };
};
