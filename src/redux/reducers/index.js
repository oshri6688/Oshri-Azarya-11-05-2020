import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer/SettingsReducer';

export default combineReducers({
  settings: SettingsReducer,
});
