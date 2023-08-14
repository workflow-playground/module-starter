import { createAction, props, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { books as booksActions } from '../actions';
import { books as booksSelectors } from '../selectors';
import { Book } from '../../types/book.types';

export const actions = {
  init: createAction('[Collection Page] Init'),

  /**
   * Add Book to Collection Actions
   */
  addBookSuccess: createAction('[Collection/API] Add Book Success', props<{ book: Book }>()),
  addBookFailure: createAction('[Collection/API] Add Book Failure', props<{ book: Book }>()),

  /**
   * Remove Book from Collection Actions
   */
  removeBookSuccess: createAction('[Collection/API] Remove Book Success', props<{ book: Book }>()),
  removeBookFailure: createAction('[Collection/API] Remove Book Failure', props<{ book: Book }>()),

  /**
   * Load Collection Actions
   */
  loadBooksSuccess: createAction('[Collection/API] Load Books Success', props<{ books: Book[] }>()),
  loadBooksFailure: createAction('[Collection/API] Load Books Failure', props<{ error: any }>()),
};

export const featureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
  initialState,
  on(actions.init, state => ({
    ...state,
    loading: true,
  })),
  on(actions.loadBooksSuccess, (_state, { books }) => ({
    loaded: true,
    loading: false,
    ids: books.map(book => book.id),
  })),
  /**
   * Optimistically add book to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by removing the book.
   *
   * `on` supports handling multiple types of actions
   */
  on(booksActions.addBook, actions.removeBookFailure, (state, { book }) => {
    if (state.ids.indexOf(book.id) > -1) {
      return state;
    }
    return {
      ...state,
      ids: [...state.ids, book.id],
    };
  }),
  /**
   * Optimistically remove book from collection.
   * If addBook fails, we "undo" adding the book.
   */
  on(booksActions.removeBook, actions.addBookFailure, (state, { book }) => ({
    ...state,
    ids: state.ids.filter(id => id !== book.id),
  })),
);

// Selectors
const selectSlice = createFeatureSelector<State>(featureKey);

const selectCollectionBookIds = createSelector(selectSlice, (state: State) => state.ids);

export const selectors = {
  selectCollectionLoaded: createSelector(selectSlice, (state: State) => state.loaded),
  getCollectionLoading: createSelector(selectSlice, (state: State) => state.loading),
  selectCollectionBookIds,
  selectBookCollection: createSelector(booksSelectors.selectBookEntities, selectCollectionBookIds, (entities, ids) => {
    return ids.map(id => entities[id]).filter((book): book is Book => book != null);
  }),
  isSelectedBookInCollection: createSelector(selectCollectionBookIds, booksSelectors.selectId, (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }),
};
