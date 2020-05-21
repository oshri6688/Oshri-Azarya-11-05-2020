import React from 'react';
import { mount } from 'enzyme';
import { HookWrapper, getHook, createMockPromise } from 'utils/TestUtils/HookTestHelper';
import { createObjectGenerator } from 'utils/TestUtils/TestUtils';
import { act } from 'react-dom/test-utils';
import useFetchData from './useFetchData';

const data = { test: 'test-options' };

const defaultProps = {
  fetchData: createMockPromise(),
  dataName: 'test-data-name',
};

const generateHook = (props) => () => useFetchData(props);

const generateProps = createObjectGenerator(defaultProps);

const consoleErrorSpy = jest.spyOn(console, 'error');

describe('useFetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return the initial state correctly when defaultData is NOT passed', () => {
      const props = generateProps();
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      const hookResult = getHook(wrapper);

      const { fetchData } = props;

      expect(hookResult).toEqual({
        data: null,
        loadData: expect.any(Function),
        isLoading: false,
        clearData: expect.any(Function),
      });

      expect(fetchData).not.toBeCalled();
      expect(consoleErrorSpy).not.toBeCalled();
    });

    it('should return the initial state correctly when defaultData is empty array', () => {
      const props = generateProps({ defaultData: [] });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      const hookResult = getHook(wrapper);

      const { fetchData, defaultData } = props;

      expect(hookResult).toEqual({
        data: defaultData,
        loadData: expect.any(Function),
        isLoading: false,
        clearData: expect.any(Function),
      });

      expect(fetchData).not.toBeCalled();
      expect(consoleErrorSpy).not.toBeCalled();
    });
  });

  describe('loadData', () => {
    it('should call fetchData when calling loadData', () => {
      const props = generateProps();
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);
      let loadDataResult;

      const { fetchData } = props;
      const args = ['test-arg-1', 'test-arg-2'];

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(false);

      expect(fetchData).not.toBeCalled();

      act(() => {
        loadDataResult = hookResult.loadData(...args);
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(true);

      expect(loadDataResult).toBe(fetchData.promise);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(...args);
    });

    it('should change data when fetchData resolved', async () => {
      const props = generateProps();
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);
      let loadDataResult;

      const { fetchData } = props;

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(false);

      expect(fetchData).not.toBeCalled();

      act(() => {
        loadDataResult = hookResult.loadData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(true);

      expect(loadDataResult).toBe(fetchData.promise);

      expect(fetchData).toBeCalledTimes(1);

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      expect(consoleErrorSpy).not.toBeCalled();
    });

    it('should log an error to the console when fetchData rejected', async () => {
      const props = generateProps();
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);
      let loadDataResult;

      const { fetchData, dataName } = props;

      const error = 'test-error';

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(false);

      expect(fetchData).not.toBeCalled();

      act(() => {
        loadDataResult = hookResult.loadData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(true);

      expect(loadDataResult).toBe(fetchData.promise);

      expect(fetchData).toBeCalledTimes(1);

      consoleErrorSpy.mockImplementationOnce(() => {});

      await fetchData.promise.reject(error);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(false);

      expect(consoleErrorSpy).toBeCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(`Error while fetching ${dataName} -`, error);
    });

    it('should change isLoading to true when updateLoadingOnlyWhenDataEmpty is true and data is empty ', async () => {
      const props = generateProps({ updateLoadingOnlyWhenDataEmpty: true, clearDataBeforeFetch: false });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      act(() => {
        hookResult.loadData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(true);

      expect(consoleErrorSpy).not.toBeCalled();
    });

    it('should change isLoading to true when updateLoadingOnlyWhenDataEmpty is true and calling clearData before calling loadData', async () => {
      const props = generateProps({ updateLoadingOnlyWhenDataEmpty: true, clearDataBeforeFetch: false });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      const { fetchData } = props;

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      act(() => {
        hookResult.clearData();
        hookResult.loadData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(true);

      expect(consoleErrorSpy).not.toBeCalled();
    });

    it('should NOT change isLoading to true when updateLoadingOnlyWhenDataEmpty is true and data is not empty', async () => {
      const props = generateProps({ updateLoadingOnlyWhenDataEmpty: true, clearDataBeforeFetch: false });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      const { fetchData } = props;

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      act(() => {
        hookResult.loadData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      expect(consoleErrorSpy).not.toBeCalled();
    });

    it('should NOT clear data when clearDataBeforeFetch is false', async () => {
      const props = generateProps({ clearDataBeforeFetch: false });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      const { fetchData } = props;

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      act(() => {
        hookResult.loadData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(true);

      expect(consoleErrorSpy).not.toBeCalled();
    });

    it('should NOT clear data when clearDataOnlyWhenFetchFailed is false and fetchData rejected', async () => {
      const props = generateProps({ clearDataBeforeFetch: false });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      const error = 'test-error';

      const { fetchData, dataName } = props;

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      fetchData.mockClear();

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      consoleErrorSpy.mockImplementationOnce(() => {});

      await fetchData.promise.reject(error);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      expect(consoleErrorSpy).toBeCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(`Error while fetching ${dataName} -`, error);
    });

    it('should clear data when clearDataOnlyWhenFetchFailed is true and fetchData rejected', async () => {
      const props = generateProps({ clearDataOnlyWhenFetchFailed: true });
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      const error = 'test-error';

      const { fetchData, dataName } = props;

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      fetchData.mockClear();

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);
      expect(hookResult.isLoading).toBe(false);

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      consoleErrorSpy.mockImplementationOnce(() => {});

      await fetchData.promise.reject(error);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);
      expect(hookResult.isLoading).toBe(false);

      expect(consoleErrorSpy).toBeCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(`Error while fetching ${dataName} -`, error);
    });
  });

  describe('clearData', () => {
    it('should clear data when calling clearData', async () => {
      const props = generateProps();
      const hook = generateHook(props);
      const wrapper = mount(<HookWrapper hook={hook} />);
      let hookResult = getHook(wrapper);

      const { fetchData } = props;

      act(() => {
        hookResult.loadData();
      });

      expect(fetchData).toBeCalledTimes(1);

      await fetchData.promise.resolve(data);

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(data);

      act(() => {
        hookResult.clearData();
      });

      hookResult = getHook(wrapper);

      expect(hookResult.data).toBe(null);

      expect(consoleErrorSpy).not.toBeCalled();
    });
  });
});
