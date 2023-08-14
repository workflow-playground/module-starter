import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconName } from '@ds24/elements';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selectors';
@Component({
  selector: 'ds-sidenav',
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  currentPage$: Observable<string | null>;

  icons: typeof IconName = IconName;

  constructor(private store: Store) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(selectors.layout.selectShowSidenav);
    this.loggedIn$ = this.store.select(selectors.auth.selectLoggedIn);
    this.currentPage$ = this.store.select(selectors.router.selectCurrentPage);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(actions.layout.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(actions.layout.openSidenav());
  }

  logout() {
    this.store.dispatch(actions.auth.logoutConfirmation());
  }
}
