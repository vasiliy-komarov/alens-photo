import noop from 'lodash/noop';

interface ResolveReject<T> {
  resolve(value?: T | PromiseLike<T>): void;
  reject(reason?: any): void;
}

export type DeferredPromise<T> = ResolveReject<T> & Promise<T>;

export function promise<T = void>(): DeferredPromise<T> {
  let resolveCallback = noop;
  let rejectCallback = noop;

  const promise = <DeferredPromise<T>> new Promise((resolve, reject) => {
    resolveCallback = resolve;
    rejectCallback = reject;
  });

  promise.resolve = resolveCallback;
  promise.reject = rejectCallback;

  return promise;
}
