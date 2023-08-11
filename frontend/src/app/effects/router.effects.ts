import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';

import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

@Injectable()
export class RouterEffects {
  updateTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() => this.store.select(selectors.router.selectRouteData)),
        map(([, data]) => `DS24 Application Reference - ${data['title']}`),
        tap(title => this.titleService.setTitle(title))
      ),
    {
      dispatch: false,
    }
  );

  initCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      withLatestFrom(
        this.store.select(selectors.router.selectCurrentPage),
        this.store.select(selectors.collection.selectCollectionLoaded)
      ),
      filter(([_action, page, loaded]) => page === 'collection' && !loaded),
      map(() => actions.collection.init())
    )
  );

  setSelectedBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      withLatestFrom(
        this.store.select(selectors.router.selectCurrentPage),
        this.store.select(selectors.router.selectRouteParam('id'))
      ),
      filter(([_action, page, id]) => page === 'collection' && !!id),
      map(([_action, _page, id]) => actions.books.selectBook({ id: id as string }))
    )
  );

  constructor(private actions$: Actions, private store: Store, private titleService: Title) {}
}
