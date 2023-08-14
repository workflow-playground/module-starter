import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, createAction, props, createFeatureSelector, createSelector } from '@ngrx/store';
import { actions as searchActions, selectors as searchSelectors } from './search.store';
import { Book } from '../../types/book.types';

export const featureKey = 'books';

export const actions = {
  selectBook: createAction('[View Book Page] Select Book', props<{ id: string }>()),
  addBook: createAction('[Selected Book Page] Add Book', props<{ book: Book }>()),
  removeBook: createAction('[Selected Book Page] Remove Book', props<{ book: Book }>()),
  loadBook: createAction('[Book Exists Guard] Load Book', props<{ book: Book }>()),
};

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Book> {
  selectedBookId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedBookId: null,
});

export const reducer = createReducer(
  initialState,
  /**
   * The addMany function provided by the created adapter
   * adds many records to the entity dictionary
   * and returns a new state including those records. If
   * the collection is to be sorted, the adapter will
   * sort each record upon entry into the sorted array.
   */
  on(searchActions.searchSuccess, (state, { books }) => adapter.addMany(books, state)),
  /**
   * The addOne function provided by the created adapter
   * adds one record to the entity dictionary
   * and returns a new state including that records if it doesn't
   * exist already. If the collection is to be sorted, the adapter will
   * insert the new record into the sorted array.
   */
  on(actions.loadBook, (state, { book }) => adapter.addOne(book, state)),
  on(actions.selectBook, (state, { id }) => ({
    ...state,
    selectedBookId: id,
  })),
);

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 *
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
const selectSlice = createFeatureSelector<State>(featureKey);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
const {
  selectIds: selectBookIds,
  selectEntities: selectBookEntities,
  selectAll: selectAllBooks,
  selectTotal: selectTotalBooks,
} = adapter.getSelectors(selectSlice);

const selectId = createSelector(selectSlice, (state: State) => state.selectedBookId);

export const selectors = {
  selectId,
  selectBookIds,
  selectBookEntities,
  selectAllBooks,
  selectTotalBooks,
  selectSelectedBook: createSelector(
    selectBookEntities,
    selectId,
    (entities, selectedId) => selectedId && entities[selectedId],
  ),
  selectSearchResults: createSelector(selectBookEntities, searchSelectors.selectSearchBookIds, (books, searchIds) => {
    return searchIds.map(id => books[id]).filter((book): book is Book => book != null);
  }),
};
