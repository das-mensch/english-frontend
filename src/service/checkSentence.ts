import axios from 'axios';
import { Observable } from 'rxjs';
import { ResponseState, ResponseWrapper } from '../types';

export const checkSentence = (sentence: string) => {
  return new Observable<ResponseWrapper<string[]>>(subscriber => {
    subscriber.next({
      state: ResponseState.PENDING
    });
    axios.post<string[]>(
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost/v1/check'
        : 'https://das-mensch-english-backend.herokuapp.com/v1/check',
      sentence,
      {
        headers: {
          'Content-type': 'text/plain',
          'Cache-Control': 'no-cache'
        }
      }
    ).then(res => {
      subscriber.next({
        state: ResponseState.SUCCESS,
        result: res.data
      });
    }).catch(() => {
      subscriber.next({
        state: ResponseState.ERROR
      });
    }).finally(() => {
      subscriber.complete();
    });
  });
};
