import { range, interval } from "rxjs";
import {
  take,
  tap,
  map,
  finalize,
  filter,
  startWith
} from "rxjs/operators";
import { createSubscriber } from './lib/util';

console.log(createSubscriber);

range(1, 10)
  .pipe(
    tap(a => console.log(`From do ${a}`)),
    finalize(a => console.log("finalize: ", a)),
    filter(a => a < 5),
    map(a => a * a)
  )
  .subscribe(createSubscriber("range"));

interval(1000)
  .pipe(
    take(10),
    startWith(-10)
  )
  .subscribe(createSubscriber("startwith"));
