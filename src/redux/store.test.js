import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { createModuleLoader } from 'utils/TestUtils/TestUtils';
import rootReducer from './reducers';

jest.mock('redux');
jest.mock('redux-thunk', () => ({ test: 'test-redux-thunk' }));
jest.mock('./reducers', () => ({ test: 'test-reducers' }));

const requireStoreModule = createModuleLoader(() => require('./store'));

const mockStore = { test: 'test-store' };
const mockCompose = (arg) => `compose-${arg}`;
const mockApplyMiddleware = (arg) => `middleware-${arg}`;

createStore.mockImplementation(() => mockStore);
compose.mockImplementation(mockCompose);
applyMiddleware.mockImplementation(mockApplyMiddleware);

const { initialState } = requireStoreModule();

describe('store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create store correctly', () => {
    const { default: store } = requireStoreModule();
    const expectedApplyMiddlewareResult = mockApplyMiddleware(reduxThunk);
    const expectedComposeResult = mockCompose(expectedApplyMiddlewareResult);

    expect(applyMiddleware).toBeCalledTimes(1);
    expect(applyMiddleware).toBeCalledWith(reduxThunk);

    expect(compose).toBeCalledTimes(1);
    expect(compose).toBeCalledWith(expectedApplyMiddlewareResult);

    expect(createStore).toBeCalledTimes(1);
    expect(createStore).toBeCalledWith(rootReducer, initialState, expectedComposeResult);

    expect(store).toBe(mockStore);
  });
});
