import React from 'react';
import MockPromise from './MockPromise/MockPromise';

const Hook = () => <div />;

export const HookWrapper = ({ hook }) => {
  const hookState = hook();

  return <Hook hook={hookState} />;
};

export const getHook = (wrapper) => {
  wrapper.update();

  return wrapper.find(Hook).prop('hook');
};

export const mockReturnPromise = (mockFunc) => {
  return mockFunc.mockImplementation(() => {
    mockFunc.promise = new MockPromise();

    return mockFunc.promise;
  });
};

export const createMockPromise = () => {
  return mockReturnPromise(jest.fn());
};
