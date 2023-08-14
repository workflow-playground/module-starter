import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { LogoutDialogComponent } from '../features/logout-dialog/components/logout-dialog.component';
import { AuthService } from '../services/auth.service';
import * as actions from '../store/actions';
import { Credentials } from '../types/user.types';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginPage.login),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map(user => actions.auth.loginSuccess({ user })),
          catchError(error => of(actions.auth.loginFailure({ error }))),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.auth.loginSuccess),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.auth.loginRedirect, actions.auth.logout),
        tap(() => {
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.auth.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<LogoutDialogComponent, undefined, boolean>(LogoutDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(result => (result ? actions.auth.logout() : actions.auth.logoutConfirmationDismiss())),
    ),
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.user.idleTimeout),
      map(() => actions.auth.logout()),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}
}
