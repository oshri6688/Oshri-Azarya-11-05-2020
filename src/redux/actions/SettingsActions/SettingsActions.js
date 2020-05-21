import * as ActionTypes from 'redux/actionsTypes/SettingsActionsTypes';
import { getFavorites } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import storageUtils from 'utils/storageUtils/storageUtils';
import storageItems from 'constants/storageItems';

export const setTemperatureUnit = (temperatureUnit) => {
  storageUtils.setItem(storageItems.TEMPERATURE_UNIT, temperatureUnit);

  return { type: ActionTypes.SET_TEMPERATURE_UNIT, temperatureUnit };
};

export const setThemeType = (themeType) => {
  storageUtils.setItem(storageItems.THEME_TYPE, themeType);

  return { type: ActionTypes.SET_THEME_TYPE, themeType };
};

export const setFavorites = (favorites) => {
  storageUtils.setItem(storageItems.FAVORITES, favorites);

  return { type: ActionTypes.SET_FAVORITES, favorites };
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
