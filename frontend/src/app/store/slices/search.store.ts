import { createReducer, createAction, props, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../../types/book.types';

export const actions = {
  searchBooks: createAction('[Find Book Page] Search Books', props<{ query: string }>()),
  searchSuccess: createAction('[Books/API] Search Success', props<{ books: Book[] }>()),
  searchFailure: createAction('[Books/API] Search Failure', props<{ errorMsg: string }>()),
};

export const featureKey = 'search';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export const reducer = createReducer(
  initialState,
  on(actions.searchBooks, (state, { query }) => {
    return query === ''
      ? {
          ids: [],
          loading: false,
          error: '',
          query,
        }
      : {
          ...state,
          loading: true,
          error: '',
          query,
        };
  }),
  on(actions.searchSuccess, (state, { books }) => ({
    ids: books.map(book => book.id),
    loading: false,
    error: '',
    query: state.query,
  })),
  on(actions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  })),
);

// Selectors
const selectSlice = createFeatureSelector<State>(featureKey);
const selectSearchBookIds = createSelector(selectSlice, (state: State) => state.ids);
export const selectors = {
  selectSearchBookIds,
  selectSearchQuery: createSelector(selectSlice, (state: State) => state.query),
  selectSearchLoading: createSelector(selectSlice, (state: State) => state.loading),
  selectSearchError: createSelector(selectSlice, (state: State) => state.error),
};
