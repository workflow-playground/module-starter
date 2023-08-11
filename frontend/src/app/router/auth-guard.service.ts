import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

export const authGuard = (): Observable<boolean> => {
  const store = inject(Store);

  return store.select(selectors.auth.selectLoggedIn).pipe(
    map((authed) => {
      if (!authed) {
        store.dispatch(actions.auth.loginRedirect());
        return false;
      }

      return true;
    }),
    take(1)
  );
};
