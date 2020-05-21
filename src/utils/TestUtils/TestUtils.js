import reduxThunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { isEmpty } from 'lodash';

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);
const mockUrl = 'http://testUrl.com';

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

export const mockLocation = (params) => {
  const paramsData = Object.entries(params).map(([key, value]) => `${key}=${value}`);

  let search = '';

  if (!isEmpty(paramsData)) {
    search = `?${paramsData.join('&')}`;
  }

  const url = `${mockUrl}${search}`;

  Object.defineProperty(window, 'location', {
    value: {
      href: url,
      search,
    },
    writable: true,
  });
};

export const mockSessionStorage = () => {
  let storage = {};

  const sessionStorage = {
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

  Object.defineProperty(window, 'sessionStorage', { value: sessionStorage });
};

export const createModuleLoader = (requireModule) => () => {
  let module;

  jest.isolateModules(() => {
    module = requireModule();
  });

  return module;
};
