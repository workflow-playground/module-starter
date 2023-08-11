import { isDevMode } from '@angular/core';
import { MetaReducer, ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { State } from './state';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as books from './slices/books.store';
import * as collection from './slices/collection.store';
import * as search from './slices/search.store';
import * as auth from './slices/auth.store';
import * as loginPage from './slices/login-page.store';
import * as layout from './slices/layout.store';

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const rootReducers: ActionReducerMap<State> = {
  [books.featureKey]: books.reducer,
  [collection.featureKey]: collection.reducer,
  [search.featureKey]: search.reducer,
  [auth.featureKey]: auth.reducer,
  [loginPage.featureKey]: loginPage.reducer,
  [layout.featureKey]: layout.reducer,
  router: routerReducer,
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
