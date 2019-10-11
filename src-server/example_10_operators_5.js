import {createSubscriber} from "./lib/util";
import {buffer, bufferCount, bufferTime, mergeMap, take, toArray} from "rxjs/operators";
import {interval, NEVER, range, Subject} from "rxjs";

range(1, 110).pipe(
  bufferCount(25)
).subscribe(createSubscriber('bufferCount'));

interval(500).pipe(
  take(4),
  bufferTime(2000)
).subscribe(createSubscriber('bufferTime'));

const stopSubject$ = new Subject();
interval(500).pipe(
  buffer(stopSubject$)
).subscribe(createSubscriber('buffer'));

setTimeout(() => {
  stopSubject$.next();
}, 5000);

range(1, 10).pipe(
  toArray()   // collect whole values to array
).subscribe(createSubscriber('toArray'));
