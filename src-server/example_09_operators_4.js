import {createSubscriber} from "./lib/util";
import {map, mergeMap, reduce, scan} from "rxjs/operators";
import {NEVER, range} from "rxjs";

function arrayReduce(array, accumulator, startValue) {
  let value = startValue;

  for (let item of array) {
    value = accumulator(value, item);
  }

  return value;
}

const values = [1, 2, 3, 4, 5];
const sum = arrayReduce(values, (acc, i) => acc + i, 0);
const max = arrayReduce(values, Math.max, -1);

range(1, 10).pipe(
  reduce((acc, value) => acc + value)   // complete 되어야 실행됨
).subscribe(createSubscriber('reduce'));

range(1, 10).pipe(
  scan((acc, value) => acc + value)   // complete 되지 않아도 각 value 에 대해 실행됨
).subscribe(createSubscriber('scan_1'));

range(1, 10).pipe(
  map(i => i * i),
  scan(([last, _], current) => [current, last, _], [])
).subscribe(createSubscriber('scan_2'));
