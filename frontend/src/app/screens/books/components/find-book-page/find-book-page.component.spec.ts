import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule, ImageModule, LoaderModule } from '@ds24/elements';

import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FindBookPageComponent } from './find-book-page.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookSearchComponent } from '../book-search/book-search.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { CollectionPageComponent } from '../collection-page/collection-page.component';
import { BookDetailsPageComponent } from '../book-details-page/book-details-page.component';

import { State, actions, selectors } from '../../../../store';

describe('Find Book Page', () => {
  let fixture: ComponentFixture<FindBookPageComponent>;
  let mockStore: MockStore<State>;
  let instance: FindBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconModule, ReactiveFormsModule, TranslateModule.forRoot(), ImageModule, LoaderModule],
      declarations: [
        BookDetailsComponent,
        BookSearchComponent,
        BookCardComponent,
        CollectionPageComponent,
        BookDetailsPageComponent,
        FindBookPageComponent,
      ],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(FindBookPageComponent);
    instance = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    mockStore.overrideSelector(selectors.search.selectSearchQuery, '');
    mockStore.overrideSelector(selectors.books.selectSearchResults, []);
    mockStore.overrideSelector(selectors.search.selectSearchLoading, false);
    mockStore.overrideSelector(selectors.search.selectSearchError, '');

    jest.spyOn(mockStore, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a book.Search action on search', () => {
    const $event = 'book name';
    const action = actions.search.searchBooks({ query: $event });

    instance.search($event);

    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });
});
