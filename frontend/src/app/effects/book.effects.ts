import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil } from 'rxjs/operators';

import { Book } from '../types/book.types';
import * as actions from '../store/actions';
import { GoogleBooksService } from '../services/google-books.service';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {
  search$ = createEffect(
    () =>
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(actions.search.searchBooks),
          debounceTime(debounce, scheduler),
          switchMap(({ query }) => {
            if (query === '') {
              return empty;
            }

            const nextSearch$ = this.actions$.pipe(ofType(actions.search.searchBooks), skip(1));

            return this.googleBooks.searchBooks(query).pipe(
              takeUntil(nextSearch$),
              map((books: Book[]) => actions.search.searchSuccess({ books })),
              catchError(err => of(actions.search.searchFailure({ errorMsg: err.message }))),
            );
          }),
        ),
  );

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.collection.loadBooksSuccess),
      map(payload => actions.search.searchSuccess(payload)),
    ),
  );

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService,
  ) {}
}
