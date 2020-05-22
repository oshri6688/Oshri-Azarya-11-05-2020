import reduxThunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

export const createMockStore = (initialState) => {
  let storeState = initialState;

  const store = mockStore(() => storeState);

  store.setState = (newState) => {
    storeState = newState;
  };

  return store;
};

export const createObjectGenerator = (defaultObj) => (newObj) => ({ ...defaultObj, ...newObj });

export const getPromiseResult = async (promise) => {
  let result;

  await act(async () => {
    result = await promise;
  });

  return result;
};

export const mockLocalStorage = () => {
  let storage = {};

  const localStorage = {
    getItem: jest.fn((key) => {
      return storage[key];
    }),

    setItem: jest.fn((key, value) => {
      storage[key] = value.toString();
    }),

    clear: jest.fn(() => {
      storage = {};
    }),
  };

  Object.defineProperty(window, 'localStorage', { value: localStorage });
};

export const createModuleLoader = (requireModule) => () => {
  let module;

  jest.isolateModules(() => {
    module = requireModule();
  });

  return module;
};
