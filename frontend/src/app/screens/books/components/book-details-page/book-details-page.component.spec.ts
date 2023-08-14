import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '@ds24/elements';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { BookDetailsPageComponent } from './book-details-page.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

import { State, actions, selectors } from '../../../../store';
import { bookMock } from '../../../../types/book.types.mock';

describe('Book Details Page', () => {
  let fixture: ComponentFixture<BookDetailsPageComponent>;
  let mockStore: MockStore<State>;
  let instance: BookDetailsPageComponent;
  let selectSelectedBook: MemoizedSelector<State, any>;
  let isSelectedBookInCollection: MemoizedSelector<State, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, IconModule],
      declarations: [BookDetailsPageComponent, BookDetailsComponent],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(BookDetailsPageComponent);
    instance = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    selectSelectedBook = mockStore.overrideSelector(selectors.books.selectSelectedBook, null);
    isSelectedBookInCollection = mockStore.overrideSelector(selectors.collection.isSelectedBookInCollection, false);

    jest.spyOn(mockStore, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a books.addBook action when onClick is called and the book is not in the collection', () => {
    selectSelectedBook.setResult(bookMock);
    isSelectedBookInCollection.setResult(false);

    const action = actions.books.addBook({ book: bookMock });

    instance.onClick();

    expect(mockStore.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a books.removeBook action on removeFromCollection', () => {
    selectSelectedBook.setResult(bookMock);
    isSelectedBookInCollection.setResult(true);

    const action = actions.books.removeBook({ book: bookMock });

    instance.onClick();

    expect(mockStore.dispatch).toHaveBeenLastCalledWith(action);
  });
});
