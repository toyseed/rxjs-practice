import { createSubscriber } from "./lib/util";
import { interval, merge, concat } from "rxjs";
import {map, take} from "rxjs/operators";

const second$ = interval(1000).pipe(
  take(10),
  map(i => (`${i} from second`))
);
const halfSecond$ = interval(500).pipe(
  take(10),
  map(i => (`${i} from halfSecond`))
);

const merged$ = merge(second$, halfSecond$);
merged$.subscribe(createSubscriber("merge1"));

const concated$ = concat(second$, halfSecond$);
concated$.subscribe(createSubscriber('concat1'));
