import { createSubscriber } from "./lib/util";
import {concat, Observable, of} from "rxjs";
import {catchError, retry, tap, throwIfEmpty} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

concat(
  of(42),
  throwIfEmpty(new Error('NOP!')),
  of(10)
).subscribe(createSubscriber("no-catch"));

// observer.error 가 실행되면 unsubscribe 된다.
// error 에서도 subscription 을 유지하기 위해 catchError 를 사용할 수 있다.
fromPromise(getapi()).pipe(
  catchError(error => of(error)),
  tap(() => console.log('thing'))
).subscribe(createSubscriber('catch'));

function getapi() {
  console.log('getting api');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('Hello');
      reject(new Error());
    })
  })
}

getObservableApi().pipe(
  retry(3),
  tap(() => console.log('hahaha'))
).subscribe(createSubscriber('retry-with-observable'));

function getObservableApi() {
  return new Observable(observer => {
    console.log('getting observable api');
    setTimeout(() => {
      // observer.next('getObservableApi');
      observer.error(new Error());
    });
  });
}