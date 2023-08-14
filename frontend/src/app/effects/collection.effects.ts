import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as actions from '../store/actions';
import { BookStorageService } from '../services/book-storage.service';
import { Book } from '../types/book.types';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(() => defer(() => this.storageService.supported()), { dispatch: false });

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.collection.init),
      switchMap(() =>
        this.storageService.getCollection().pipe(
          map((books: Book[]) => actions.collection.loadBooksSuccess({ books })),
          catchError(error => of(actions.collection.loadBooksFailure({ error }))),
        ),
      ),
    ),
  );

  addBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.books.addBook),
      mergeMap(({ book }) =>
        this.storageService.addToCollection([book]).pipe(
          map(() => actions.collection.addBookSuccess({ book })),
          catchError(() => of(actions.collection.addBookFailure({ book }))),
        ),
      ),
    ),
  );

  removeBookFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.books.removeBook),
      mergeMap(({ book }) =>
        this.storageService.removeFromCollection([book.id]).pipe(
          map(() => actions.collection.removeBookSuccess({ book })),
          catchError(() => of(actions.collection.removeBookFailure({ book }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private storageService: BookStorageService,
  ) {}
}
