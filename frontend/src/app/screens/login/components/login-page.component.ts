import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReactiveLifecycles } from '@ds24/utilities';
import { takeUntil } from 'rxjs';

import * as selectors from '../../../store/selectors';
import * as actions from '../../../store/actions';

@Component({
  selector: 'ds-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent extends ReactiveLifecycles {
  error$ = this.store.select(selectors.loginPage.selectLoginPageError);

  form: FormGroup = new FormGroup({
    username: new FormControl('ngrx'),
    password: new FormControl(''),
  });

  constructor(private store: Store) {
    super();

    this.store
      .select(selectors.loginPage.selectLoginPagePending)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(isPending => {
        if (isPending) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
  }

  submit() {
    this.store.dispatch(actions.loginPage.login({ credentials: this.form.value }));
  }
}
