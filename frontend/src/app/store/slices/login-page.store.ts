import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { actions as authActions } from './auth.store';
import { Credentials } from '../../types/user.types';

export const featureKey = 'loginPage';

export const actions = {
  login: createAction('[Login Page] Login', props<{ credentials: Credentials }>()),
};

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const reducer = createReducer(
  initialState,
  on(actions.login, state => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(authActions.loginSuccess, state => ({
    ...state,
    error: null,
    pending: false,
  })),

  on(authActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  })),
);

// Selectors
export const selectSlice = createFeatureSelector<State>(featureKey);

export const selectors = {
  selectLoginPageError: createSelector(selectSlice, (state: State) => state.error),
  selectLoginPagePending: createSelector(selectSlice, (state: State) => state.pending),
};
