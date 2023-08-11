import { RouterReducerState } from '@ngrx/router-store';

import * as books from './slices/books.store';
import * as collection from './slices/collection.store';
import * as search from './slices/search.store';
import * as auth from './slices/auth.store';
import * as loginPage from './slices/login-page.store';
import * as layout from './slices/layout.store';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  [books.featureKey]: books.State;
  [collection.featureKey]: collection.State;
  [search.featureKey]: search.State;
  [auth.featureKey]: auth.State;
  [loginPage.featureKey]: loginPage.State;
  [layout.featureKey]: layout.State;
  router: RouterReducerState;
}
