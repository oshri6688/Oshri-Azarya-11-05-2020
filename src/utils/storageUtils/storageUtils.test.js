import { mockLocalStorage } from 'utils/TestUtils/TestUtils';
import storageUtils from './storageUtils';

const key = 'test-key';

const item = { test: 'test-storage-item' };
const jsonItem = JSON.stringify(item);

mockLocalStorage();

describe('storageUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItem', () => {
    const defaultValue = 'test-default-value';

    it('should return storage item correctly', () => {
      localStorage.getItem.mockReturnValueOnce(jsonItem);
      const result = storageUtils.getItem(key, defaultValue);

      expect(result).toEqual(item);

      expect(localStorage.getItem).toBeCalledTimes(1);
      expect(localStorage.getItem).toBeCalledWith(key);
    });

    it('should return defaultValue when item does not exist', () => {
      localStorage.getItem.mockReturnValueOnce(null);
      const result = storageUtils.getItem(key, defaultValue);

      expect(result).toBe(defaultValue);

      expect(localStorage.getItem).toBeCalledTimes(1);
      expect(localStorage.getItem).toBeCalledWith(key);
    });
  });

  describe('setItem', () => {
    it('should set storage item correctly', () => {
      storageUtils.setItem(key, item);

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toBeCalledWith(key, jsonItem);
    });
  });
});
