import { props, createAction, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../types/user.types';

export const actions = {
  loginSuccess: createAction('[Auth/API] Login Success', props<{ user: User }>()),
  loginFailure: createAction('[Auth/API] Login Failure', props<{ error: any }>()),
  loginRedirect: createAction('[Auth/API] Login Redirect'),
  logout: createAction('[Auth] Logout'),
  logoutConfirmation: createAction('[Auth] Logout Confirmation'),
  logoutConfirmationDismiss: createAction('[Auth] Logout Confirmation Dismiss'),
};

export const featureKey = 'auth';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(actions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(actions.logout, () => initialState),
);

// Selectors
const selectSlice = createFeatureSelector<State>(featureKey);
const selectUser = createSelector(selectSlice, (state: State) => state.user);

export const selectors = {
  selectUser,
  selectLoggedIn: createSelector(selectUser, user => !!user),
};
