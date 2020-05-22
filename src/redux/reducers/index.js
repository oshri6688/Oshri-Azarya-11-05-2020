import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer/SettingsReducer';

const reducers = combineReducers({
  settings: SettingsReducer,
});

export default reducers;
