import dataUtils from './dataUtils';

const data = 'test-data';

describe('dataUtils', () => {
  describe('getData', () => {
    it('should return res.data', () => {
      const res = { data };

      const result = dataUtils.getData(res);

      expect(result).toBe(data);
    });

    it('should return null when res.data does not exist', () => {
      const res = { test: 'test-res' };

      const result = dataUtils.getData(res);

      expect(result).toBe(null);
    });
  });

  describe('getDataList', () => {
    it('should return res.data when res.data is array', () => {
      const arrData = [data];
      const res = { data: arrData };

      const result = dataUtils.getDataList(res);

      expect(result).toBe(arrData);
    });

    it('should return empty array when res.data is not array', () => {
      const res = { data };

      const result = dataUtils.getDataList(res);

      expect(result).toEqual([]);
    });
  });

  describe('getErrorData', () => {
    it('should return err.response.data', () => {
      const err = { response: { data } };

      const result = dataUtils.getErrorData(err);

      expect(result).toBe(data);
    });

    it('should return null when err.response.data does not exist', () => {
      const err = { response: { test: 'test-response' } };

      const result = dataUtils.getErrorData(err);

      expect(result).toBe(null);
    });
  });

  describe('throwErrorData', () => {
    it('should throw err.response.data', () => {
      const err = { response: { data } };

      expect(() => dataUtils.throwErrorData(err)).toThrowError(data);
    });
  });
});
