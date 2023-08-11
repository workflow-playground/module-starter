import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import { Book } from '../../../types/book.types';
import { IconColor, IconName } from '@ds24/elements';

@Component({
  selector: 'ds-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './find-book-page.component.html'
})
export class FindBookPageComponent {
  icons: typeof IconName = IconName;
  iconColors: typeof IconColor = IconColor;

  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store) {
    this.searchQuery$ = store.select(selectors.search.selectSearchQuery);
    this.books$ = store.select(selectors.books.selectSearchResults);
    this.loading$ = store.select(selectors.search.selectSearchLoading);
    this.error$ = store.select(selectors.search.selectSearchError);
  }

  search(query: string) {
    this.store.dispatch(actions.search.searchBooks({ query }));
  }
}
