export enum ResponseState {
  STALE = 'STALE',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface ResponseWrapper<T> {
  state: ResponseState;
  result?: T;
}
