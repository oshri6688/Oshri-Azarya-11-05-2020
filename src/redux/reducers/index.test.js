import { combineReducers } from 'redux';
import { createModuleLoader } from 'utils/TestUtils/TestUtils';
import SettingsReducer from './SettingsReducer/SettingsReducer';

jest.mock('redux');
jest.mock('./SettingsReducer/SettingsReducer', () => ({ test: 'test-settings-reducer' }));

const requireReducersModule = createModuleLoader(() => require('./index'));

const mockReducers = { test: 'test-reducers' };

combineReducers.mockImplementation(() => mockReducers);

describe('reducers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create reducers correctly', () => {
    const { default: reducers } = requireReducersModule();

    expect(combineReducers).toBeCalledTimes(1);
    expect(combineReducers).toBeCalledWith({
      settings: SettingsReducer,
    });

    expect(reducers).toBe(mockReducers);
  });
});
