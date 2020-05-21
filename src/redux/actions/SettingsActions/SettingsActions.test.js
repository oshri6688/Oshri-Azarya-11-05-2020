import * as ActionTypes from 'redux/actionsTypes/SettingsActionsTypes';
import { getFavorites } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import storageUtils from 'utils/storageUtils/storageUtils';
import storageItems from 'constants/storageItems';
import { createMockStore } from 'utils/TestUtils/TestUtils';
import * as SettingsActions from './SettingsActions';

jest.mock('utils/storageUtils/storageUtils', () => ({
  setItem: jest.fn(),
}));

jest.mock('redux/selectors/SettingsSelectors/SettingsSelectors', () => ({
  getFavorites: jest.fn(),
}));

const initialState = { test: 'test-initial-state' };

const store = createMockStore(initialState);

describe('SettingsActions', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  describe('setTemperatureUnit', () => {
    it('should set temperature unit', () => {
      const temperatureUnit = 'test-temperature-unit';
      const expectedActions = [{ type: ActionTypes.SET_TEMPERATURE_UNIT, temperatureUnit }];

      store.dispatch(SettingsActions.setTemperatureUnit(temperatureUnit));

      expect(store.getActions()).toEqual(expectedActions);

      expect(storageUtils.setItem).toBeCalledTimes(1);
      expect(storageUtils.setItem).toBeCalledWith(storageItems.TEMPERATURE_UNIT, temperatureUnit);
    });
  });

  describe('setThemeType', () => {
    it('should set theme type', () => {
      const themeType = 'test-theme-type';
      const expectedActions = [{ type: ActionTypes.SET_THEME_TYPE, themeType }];

      store.dispatch(SettingsActions.setThemeType(themeType));

      expect(store.getActions()).toEqual(expectedActions);

      expect(storageUtils.setItem).toBeCalledTimes(1);
      expect(storageUtils.setItem).toBeCalledWith(storageItems.THEME_TYPE, themeType);
    });
  });

  describe('setFavorites', () => {
    it('should set favorites', () => {
      const favorites = ['test-favorites'];
      const expectedActions = [{ type: ActionTypes.SET_FAVORITES, favorites }];

      store.dispatch(SettingsActions.setFavorites(favorites));

      expect(store.getActions()).toEqual(expectedActions);

      expect(storageUtils.setItem).toBeCalledTimes(1);
      expect(storageUtils.setItem).toBeCalledWith(storageItems.FAVORITES, favorites);
    });
  });

  describe('toggleFavoriteLocation', () => {
    const location = { id: 'test-location-id' };

    it('should add location to favorites when location does not exit in favorites', () => {
      const favorites = [location];
      const expectedActions = [{ type: ActionTypes.SET_FAVORITES, favorites }];

      getFavorites.mockReturnValueOnce([]);

      store.dispatch(SettingsActions.toggleFavoriteLocation(location));

      expect(store.getActions()).toEqual(expectedActions);

      expect(getFavorites).toBeCalledTimes(1);
      expect(getFavorites).toBeCalledWith(initialState);

      expect(storageUtils.setItem).toBeCalledTimes(1);
      expect(storageUtils.setItem).toBeCalledWith(storageItems.FAVORITES, favorites);
    });

    it('should remove location from favorites when location exits in favorites', () => {
      const favorites = [];
      const expectedActions = [{ type: ActionTypes.SET_FAVORITES, favorites }];

      getFavorites.mockReturnValueOnce([location]);

      store.dispatch(SettingsActions.toggleFavoriteLocation(location));

      expect(store.getActions()).toEqual(expectedActions);

      expect(getFavorites).toBeCalledTimes(1);
      expect(getFavorites).toBeCalledWith(initialState);

      expect(storageUtils.setItem).toBeCalledTimes(1);
      expect(storageUtils.setItem).toBeCalledWith(storageItems.FAVORITES, favorites);
    });
  });
});
