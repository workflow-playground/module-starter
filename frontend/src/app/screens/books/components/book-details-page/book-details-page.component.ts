import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconColor, IconName } from '@ds24/elements';

import { Store } from '@ngrx/store';
import { Observable, combineLatest, take } from 'rxjs';

import * as actions from '../../../../store/actions';
import * as selectors from '../../../../store/selectors';
import { Book } from '../../../../types/book.types';

@Component({
  selector: 'ds-book-details-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-details-page.component.html',
})
export class BookDetailsPageComponent {
  icons: typeof IconName = IconName;
  iconColors: typeof IconColor = IconColor;

  book$ = this.store.select(selectors.books.selectSelectedBook) as Observable<Book>;
  isSelectedBookInCollection$ = this.store.select(selectors.collection.isSelectedBookInCollection);

  constructor(private store: Store) {}

  onClick() {
    combineLatest([this.book$, this.isSelectedBookInCollection$])
      .pipe(take(1))
      .subscribe(([book, isSelectedBookInCollection]) => {
        if (!isSelectedBookInCollection) {
          this.store.dispatch(actions.books.addBook({ book }));
        } else {
          this.store.dispatch(actions.books.removeBook({ book }));
        }
      });
  }
}
