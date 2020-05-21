import * as ActionTypes from 'redux/actionsTypes/SettingsActionsTypes';
import storageUtils from 'utils/storageUtils/storageUtils';
import temperatureUnits from 'constants/temperatureUnits';
import storageItems from 'constants/storageItems';
import themeTypes from 'constants/themeTypes';

export const initialState = {
  favorites: storageUtils.getItem(storageItems.FAVORITES, []),
  themeType: storageUtils.getItem(storageItems.THEME_TYPE, themeTypes.LIGHT),
  temperatureUnit: storageUtils.getItem(storageItems.TEMPERATURE_UNIT, temperatureUnits.CELSIUS),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FAVORITES:
      return { ...state, favorites: action.favorites };

    case ActionTypes.SET_THEME_TYPE:
      return { ...state, themeType: action.themeType };

    case ActionTypes.SET_TEMPERATURE_UNIT:
      return { ...state, temperatureUnit: action.temperatureUnit };

    default:
      return state;
  }
};
