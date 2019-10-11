import { createSubscriber } from "./lib/util";
import {interval, Observable, timer} from "rxjs";
import {first, last, single, skip, skipUntil, skipWhile, take, takeUntil, takeWhile} from "rxjs/operators";

const simple$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
  observer.complete();
});

simple$.pipe(
  first()
).subscribe(createSubscriber('first'));

simple$.pipe(
  last()
).subscribe(createSubscriber('last'));

simple$.pipe(
  single()    // observable 이 단일 값을 전달하지 않으면 error
).subscribe(createSubscriber('single'));

simple$.pipe(
  take(2)
).subscribe(createSubscriber('take'));

simple$.pipe(
  skip(2)
).subscribe(createSubscriber('skip'));

interval(500).pipe(
  skipWhile(i => i < 4),
  takeWhile(i => i < 10)
).subscribe(createSubscriber('skipWhile|takeWhile'))

interval(500).pipe(
  skipUntil(timer(3000)),
  takeUntil(timer(5000))
).subscribe(createSubscriber('skipUntil|takeUntil'));
