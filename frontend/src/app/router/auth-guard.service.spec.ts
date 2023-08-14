import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { authGuard } from './auth-guard.service';
import { State, selectors } from '../store';

describe('Auth Guard', () => {
  let guard: Observable<boolean>;
  let store: MockStore;
  let loggedIn: MemoizedSelector<State, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.runInInjectionContext(authGuard);
    loggedIn = store.overrideSelector(selectors.auth.selectLoggedIn, false);
  });

  it('should return false if the user state is not logged in', () => {
    const expected = cold('(a|)', { a: false });

    expect(guard).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    const expected = cold('(a|)', { a: true });

    loggedIn.setResult(true);

    expect(guard).toBeObservable(expected);
  });
});
