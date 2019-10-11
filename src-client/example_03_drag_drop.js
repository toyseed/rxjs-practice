import $ from "jquery";
import * as rx from "rxjs";
import {
  last,
  map,
  mergeMap,
  takeUntil,
  tap,
  withLatestFrom
} from "rxjs/operators";

const $draggable = $("#draggable");
const $dropAreas = $(".drop-area");

const start$ = rx.fromEvent($draggable, "mousedown");
const move$ = rx.fromEvent(document, "mousemove");
const end$ = rx.fromEvent(document, "mouseup");

const over$ = rx.merge(
  rx.fromEvent($dropAreas, "mouseover").pipe(map(event => $(event.target))),
  rx.fromEvent($dropAreas, "mouseout").pipe(map(() => null))
);

const dragDrop$ = start$.pipe(
  tap(event => {
    event.preventDefault();
    $draggable.addClass("dragging");
  }),
  mergeMap(startEvent => {
    return move$.pipe(
      takeUntil(end$),
      tap(moveEvent => {
        moveDragable(startEvent, moveEvent);
      }),
      last(),
      withLatestFrom(over$, (_, $last) => $last)
    );
  }),
  tap(() => {
    $draggable.removeClass("dragging").animate({ top: 0, left: 0 }, 250);
  })
);

dragDrop$.subscribe($dropArea => {
  $dropAreas.removeClass("dropped");

  if ($dropArea) {
    $dropArea.addClass("dropped");
  }
});

function moveDragable(startEvent, moveEvent) {
  $draggable.css({
    top: moveEvent.clientY - startEvent.offsetY,
    left: moveEvent.clientX - startEvent.offsetY
  });
}

end$.subscribe({
  next(value) {
    console.log(`end$.next: ${value}`);
  },
  complete() {
    console.log("complete $end");
  }
});
