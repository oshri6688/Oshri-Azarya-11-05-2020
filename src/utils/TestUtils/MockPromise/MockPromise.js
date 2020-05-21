import { isFunction } from 'lodash';
import { getPromiseResult } from '../TestUtils';

export default class MockPromise {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  }

  resolve(...args) {
    this.promiseResolve(...args);

    return getPromiseResult(this);
  }

  reject(...args) {
    this.promiseReject(...args);

    return getPromiseResult(this);
  }

  then(...callbacks) {
    this.promise = this.promise.then(...callbacks);

    return this;
  }

  catch(callback) {
    this.promise = this.promise.catch(callback);

    return this;
  }

  finally(callback) {
    if (isFunction(this.promise.finally)) {
      this.promise = this.promise.finally(callback);
    } else {
      this.promise = this.promise.then(callback);
    }

    return this;
  }
}
