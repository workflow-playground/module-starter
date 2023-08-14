import { Credentials, User } from '../../types/user.types';
import { reducer, actions, initialState } from './login-page.store';
import * as authStore from './auth.store';

describe('LoginPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN', () => {
    it('should make pending to true', () => {
      const user = { username: 'test' } as Credentials;
      const createAction = actions.login({ credentials: user });

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should have no error and no pending state', () => {
      const user = { name: 'test' } as User;
      const createAction = authStore.actions.loginSuccess({ user });

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should have an error and no pending state', () => {
      const error = 'login failed';
      const createAction = authStore.actions.loginFailure({ error });

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });
});
