import {of, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {flatMap} from "rxjs/internal/operators";

const log$ = new Subject();
log$.subscribe(log => console.log(log));

of(1, 2, 3).pipe(map(num => num * 2)).subscribe(log$);
// of( 1, 2, 3).pipe(flatMap())
