import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';

import { Observable } from 'rxjs';

import { BookEffects } from './book.effects';
import { GoogleBooksService } from '../services/google-books.service';
import { Book } from '../types/book.types';
import { actions } from '../store';

describe('BookEffects', () => {
  let effects: BookEffects;
  let googleBooksService: any;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        {
          provide: GoogleBooksService,
          useValue: { searchBooks: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(BookEffects);
    googleBooksService = TestBed.inject(GoogleBooksService);
    actions$ = TestBed.inject(Actions);
  });

  describe('search$', () => {
    it('should return a book.SearchComplete, with the books, on success, after the de-bounce', () => {
      const book1 = { id: '111', volumeInfo: {} } as Book;
      const book2 = { id: '222', volumeInfo: {} } as Book;
      const books = [book1, book2];
      const action = actions.search.searchBooks({ query: 'query' });
      const completion = actions.search.searchSuccess({ books });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: books });
      const expected = cold('-----b', { b: completion });
      googleBooksService.searchBooks = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        }),
      ).toBeObservable(expected);
    });

    it('should return a book.SearchError if the books service throws', () => {
      const action = actions.search.searchBooks({ query: 'query' });
      const completion = actions.search.searchFailure({
        errorMsg: 'Unexpected Error. Try again later.',
      });
      const error = { message: 'Unexpected Error. Try again later.' };

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      googleBooksService.searchBooks = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        }),
      ).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = actions.search.searchBooks({ query: '' });

      actions$ = hot('-a---', { a: action });
      const expected = cold('---');

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        }),
      ).toBeObservable(expected);
    });
  });
});
