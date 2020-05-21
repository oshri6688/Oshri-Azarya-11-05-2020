import * as ActionTypes from 'redux/actionsTypes/SettingsActionsTypes';
import storageUtils from 'utils/storageUtils/storageUtils';
import temperatureUnits from 'constants/temperatureUnits';
import storageItems from 'constants/storageItems';
import themeTypes from 'constants/themeTypes';
import SettingsReducer, { initialState } from './SettingsReducer';

jest.mock('utils/storageUtils/storageUtils', () => ({
  getItem: jest.fn((key, defaultValue) => defaultValue),
}));

describe('SettingsReducer', () => {
  describe('initialState', () => {
    it('should create initialState correctly', () => {
      const expectedInitialState = {
        favorites: [],
        themeType: themeTypes.LIGHT,
        temperatureUnit: temperatureUnits.CELSIUS,
      };

      expect(initialState).toEqual(expectedInitialState);

      expect(storageUtils.getItem).toBeCalledTimes(3);
      expect(storageUtils.getItem).nthCalledWith(1, storageItems.FAVORITES, []);
      expect(storageUtils.getItem).nthCalledWith(2, storageItems.THEME_TYPE, themeTypes.LIGHT);
      expect(storageUtils.getItem).nthCalledWith(3, storageItems.TEMPERATURE_UNIT, temperatureUnits.CELSIUS);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      const state = SettingsReducer(undefined, {});

      expect(state).toBe(initialState);
    });

    it('should handle SET_FAVORITES', () => {
      const favorites = ['new-favorites'];
      const action = { type: ActionTypes.SET_FAVORITES, favorites };
      const expectedState = { ...initialState, favorites };

      const state = SettingsReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });

    it('should handle SET_THEME_TYPE', () => {
      const themeType = 'new-theme-type';
      const action = { type: ActionTypes.SET_THEME_TYPE, themeType };
      const expectedState = { ...initialState, themeType };

      const state = SettingsReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });

    it('should handle SET_TEMPERATURE_UNIT', () => {
      const temperatureUnit = 'new-temperature-unit';
      const action = { type: ActionTypes.SET_TEMPERATURE_UNIT, temperatureUnit };
      const expectedState = { ...initialState, temperatureUnit };

      const state = SettingsReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
  });
});
