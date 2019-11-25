import {
  interval,
  Observable,
  of,
  combineLatest,
  zip,
  BehaviorSubject
} from "rxjs";
import { take, takeUntil, takeWhile, tap } from "rxjs/operators";

const indexer$ = new Observable(subscriber => {
  let i = 0;
  while (!subscriber.closed) {
    subscriber.next(i++);
    console.log("indexer");
  }
});

const array$ = of("a", "b", "c", "d", "e");

const index$ = new BehaviorSubject(0);
zip(array$, index$)
  .pipe(
  )
  .subscribe(([v, i]) => {
    console.log('v: ', v);
    console.log('i: ', i);
    index$.next(++i);
  });

// index$.subscribe(v => console.log(v));
// array$.subscribe(v => index$.next(v));
