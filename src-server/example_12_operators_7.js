import { createSubscriber } from "./lib/util";
import { interval, range, zip } from "rxjs";
import {map, take} from "rxjs/operators";

function arrayZip(array1, array2, selector) {
  const count = Math.mine(array1.length, array2.length);
  const results = [];

  for (let i = 0; i < count; i++) {
    const combined = selector(array1[i], array2[i]);
    results.push(combined);
  }

  return results;
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [19, 28, 37, 46, 55];

// range(1, 10)
//   .pipe(zip(interval(500), (left, right) => `item: ${left}, at ${right * 500}`))
//   .subscribe(createSubscriber("zip"));

const range$ = range(1, 10);
const interval$ = interval(500).pipe(take(15));

zip(range$, interval$).pipe(
  map(([left, right]) => `item: ${left}, at ${right * 500}`)
).subscribe(createSubscriber('zip'));

// https://rxjs-dev.firebaseapp.com/api/operators/withLatestFrom
// https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest