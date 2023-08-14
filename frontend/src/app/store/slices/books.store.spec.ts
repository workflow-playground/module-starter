import { reducer, State, actions } from './books.store';
import * as searchStore from './search.store';
import { Book } from '../../types/book.types';
import { bookMock } from '../../types/book.types.mock';

describe('BooksReducer', () => {
  const book1 = bookMock;
  const book2 = { ...book1, id: '222' };
  const book3 = { ...book1, id: '333' };
  const initialState: State = {
    ids: [book1.id, book2.id],
    entities: {
      [book1.id]: book1,
      [book2.id]: book2,
    },
    selectedBookId: null,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    type BooksActions = typeof searchStore.actions.searchSuccess;
    function noExistingBooks(action: BooksActions, booksInitialState: any, books: Book[]) {
      const createAction = action({ books });

      const result = reducer(booksInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    function existingBooks(action: BooksActions, booksInitialState: any, books: Book[]) {
      // should not replace existing books
      const differentBook2 = { ...books[0], foo: 'bar' };
      const createAction = action({ books: [books[1], differentBook2] });

      const result = reducer(booksInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    it('should add all books in the payload when none exist', () => {
      noExistingBooks(searchStore.actions.searchSuccess, initialState, [book1, book2]);
    });

    it('should add only books when books already exist', () => {
      existingBooks(searchStore.actions.searchSuccess, initialState, [book2, book3]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [book1.id],
      entities: {
        [book1.id]: book1,
      },
      selectedBookId: null,
    };

    it('should add a single book, if the book does not exist', () => {
      const action = actions.loadBook({ book: book1 });

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the book exists', () => {
      const action = actions.loadBook({ book: book1 });

      const result = reducer(expectedResult, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected book id on the state', () => {
      const action = actions.selectBook({ id: book1.id });

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });
});
