import { createSubscriber } from "./lib/util";
import {from, interval, of, range, timer} from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";

range(1, 3)
  .pipe(
    mergeMap(i =>
      interval(i * 2000).pipe(
        take(5),
        map(() => `After ${i * 2} Seconds`)
      )
    )
  )
  .subscribe(createSubscriber("mergeMap"));

fromPromise(getTracks())
  .pipe(mergeMap(tracks => from(tracks)))
  .subscribe(createSubscriber("from promise"));

function getTracks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["track1", "track2", "track3"]);
    });
  }, 1000);
}

of('my query').pipe(
  mergeMap(query)
).subscribe(createSubscriber('from promise2'));

function query(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`THIS IS THE VALUE: ${value}`);
    }, 1000);
  });
}