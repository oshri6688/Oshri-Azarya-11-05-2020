import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

export const initialState = {};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(reduxThunk)));

export default store;
