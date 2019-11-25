import {range, zip} from "rxjs";
import {flatMap, map} from "rxjs/operators";

const range$ = range(1, 9);
range$.pipe(
  flatMap(x => range(1, 9).pipe(map(y => `${x} x ${y} = ${x * y}`)))
).subscribe(value => console.log('flatMap', value));

zip(range$, range$).pipe(
  map(([x, y]) => `${x} x ${y} = ${x * y}`)
).subscribe(value => console.log('zip', value));