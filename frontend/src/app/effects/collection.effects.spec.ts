import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { CollectionEffects } from './collection.effects';
import { Book } from '../types/book.types';
import { BookStorageService, LOCAL_STORAGE_TOKEN } from '../services/book-storage.service';
import { actions } from '../store';

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: Observable<any>;

  const book1 = { id: '111', volumeInfo: {} } as Book;
  const book2 = { id: '222', volumeInfo: {} } as Book;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: BookStorageService,
          useValue: {
            supported: jest.fn(),
            deleteStoredCollection: jest.fn(),
            addToCollection: jest.fn(),
            getCollection: jest.fn(),
            removeFromCollection: jest.fn(),
          },
        },
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: {
            removeItem: jest.fn(),
            setItem: jest.fn(),
            getItem: jest.fn(() => JSON.stringify([])),
          },
        },
        provideMockActions(() => actions$),
      ],
    });

    db = TestBed.inject(BookStorageService);
    effects = TestBed.inject(CollectionEffects);
    actions$ = TestBed.inject(Actions);
  });
  describe('checkStorageSupport$', () => {
    it('should call db.checkStorageSupport when initially subscribed to', () => {
      effects.checkStorageSupport$.subscribe();
      expect(db.supported).toHaveBeenCalled();
    });
  });
  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the books, on success', () => {
      const action = actions.collection.init();
      const completion = actions.collection.loadBooksSuccess({
        books: [book1, book2],
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: [book1, book2] });
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = actions.collection.init();
      const error = 'Error!';
      const completion = actions.collection.loadBooksFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addBookToCollection$', () => {
    it('should return a collection.AddBookSuccess, with the book, on success', () => {
      const action = actions.books.addBook({ book: book1 });
      const completion = actions.collection.addBookSuccess({ book: book1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addBookToCollection$).toBeObservable(expected);
    });

    it('should return a collection.AddBookFail, with the book, when the db insert throws', () => {
      const action = actions.books.addBook({ book: book1 });
      const completion = actions.collection.addBookFailure({ book: book1 });
      const error = 'Error!';

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addBookToCollection$).toBeObservable(expected);
    });

    describe('removeBookFromCollection$', () => {
      it('should return a collection.RemoveBookSuccess, with the book, on success', () => {
        const action = actions.books.removeBook({ book: book1 });
        const completion = actions.collection.removeBookSuccess({
          book: book1,
        });

        actions$ = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeBookFromCollection$).toBeObservable(expected);
      });

      it('should return a collection.RemoveBookFail, with the book, when the db insert throws', () => {
        const action = actions.books.removeBook({ book: book1 });
        const completion = actions.collection.removeBookFailure({
          book: book1,
        });
        const error = 'Error!';

        actions$ = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeBookFromCollection$).toBeObservable(expected);
      });
    });
  });
});
