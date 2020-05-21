import { getPromiseResult } from '../TestUtils';
import MockPromise from './MockPromise';

jest.mock('../TestUtils', () => ({
  getPromiseResult: jest.fn(),
}));

const testArgs = ['test-arg-1', 'test-arg-2', 'test-arg-3'];
const testCallback = () => {};

const newPromise = { test: 'test-promise' };
const promiseResult = 'test-promise-result';

let mockPromise;

getPromiseResult.mockReturnValue(promiseResult);

describe('MockPromise', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockPromise = new MockPromise();
  });

  describe('constructor', () => {
    it('should create MockPromise instance', () => {
      expect(mockPromise).toBeDefined();
      expect(mockPromise).toBeInstanceOf(MockPromise);
    });

    it('should correctly set promise properties', () => {
      expect(mockPromise.promise).toBeInstanceOf(Promise);
      expect(mockPromise.promiseResolve).toBeInstanceOf(Function);
      expect(mockPromise.promiseReject).toBeInstanceOf(Function);
    });
  });

  describe('resolve', () => {
    it('should call promiseResolve', () => {
      const promiseResolveSpy = jest.spyOn(mockPromise, 'promiseResolve');

      const result = mockPromise.resolve(...testArgs);

      expect(result).toBe(promiseResult);

      expect(promiseResolveSpy).toBeCalledTimes(1);
      expect(promiseResolveSpy).toBeCalledWith(...testArgs);

      expect(getPromiseResult).toBeCalledTimes(1);
      expect(getPromiseResult).toBeCalledWith(mockPromise);
    });
  });

  describe('reject', () => {
    it('should call promiseReject', () => {
      const promiseRejectSpy = jest.spyOn(mockPromise, 'promiseReject');

      const result = mockPromise.reject(...testArgs);

      expect(result).toBe(promiseResult);

      expect(promiseRejectSpy).toBeCalledTimes(1);
      expect(promiseRejectSpy).toBeCalledWith(...testArgs);

      expect(getPromiseResult).toBeCalledTimes(1);
      expect(getPromiseResult).toBeCalledWith(mockPromise);
    });
  });

  describe('then', () => {
    it('should call promise.then', () => {
      const promiseThenSpy = jest.spyOn(mockPromise.promise, 'then');
      const testCallbacks = [() => {}, () => {}];

      promiseThenSpy.mockReturnValueOnce(newPromise);

      const result = mockPromise.then(...testCallbacks);

      expect(mockPromise.promise).toBe(newPromise);

      expect(result).toBe(mockPromise);

      expect(promiseThenSpy).toBeCalledTimes(1);
      expect(promiseThenSpy).toBeCalledWith(...testCallbacks);
    });
  });

  describe('catch', () => {
    it('should call promise.catch', () => {
      const promiseCatchSpy = jest.spyOn(mockPromise.promise, 'catch');

      promiseCatchSpy.mockReturnValueOnce(newPromise);

      const result = mockPromise.catch(testCallback);

      expect(mockPromise.promise).toBe(newPromise);

      expect(result).toBe(mockPromise);

      expect(promiseCatchSpy).toBeCalledTimes(1);
      expect(promiseCatchSpy).toBeCalledWith(testCallback);
    });
  });

  describe('finally', () => {
    it('should call promise.finally when promise.finally is function', () => {
      const promiseFinallySpy = jest.spyOn(mockPromise.promise, 'finally');

      promiseFinallySpy.mockReturnValueOnce(newPromise);

      const result = mockPromise.finally(testCallback);

      expect(mockPromise.promise).toBe(newPromise);

      expect(result).toBe(mockPromise);

      expect(promiseFinallySpy).toBeCalledTimes(1);
      expect(promiseFinallySpy).toBeCalledWith(testCallback);
    });

    it('should call promise.then  when promise.finally is NOT function', () => {
      const promiseThenSpy = jest.spyOn(mockPromise.promise, 'then');

      promiseThenSpy.mockReturnValueOnce(newPromise);

      mockPromise.promise.finally = null;

      const result = mockPromise.finally(testCallback);

      expect(mockPromise.promise).toBe(newPromise);

      expect(result).toBe(mockPromise);

      expect(promiseThenSpy).toBeCalledTimes(1);
      expect(promiseThenSpy).toBeCalledWith(testCallback);
    });
  });
});
