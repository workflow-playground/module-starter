import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';

import { actions as authActions } from './auth.store';

export const featureKey = 'layout';

export interface State {
  showSidenav: boolean;
}

export const actions = {
  openSidenav: createAction('[Layout] Open Sidenav'),
  closeSidenav: createAction('[Layout] Close Sidenav'),
};

const initialState: State = {
  showSidenav: false,
};

export const reducer = createReducer(
  initialState,
  on(actions.closeSidenav, () => ({ showSidenav: false })),
  on(actions.openSidenav, () => ({ showSidenav: true })),
  on(authActions.logoutConfirmation, () => ({ showSidenav: false }))
);

// Selectors
const selectSlice = createFeatureSelector<State>('layout');

export const selectors = {
  selectShowSidenav: createSelector(selectSlice, (state: State) => state.showSidenav),
};
