import { createReducer, on } from '@ngrx/store';
import { bookActions } from '../actions/book.action';
import { BookState, Status } from '../states/book.state';

const initialState: BookState = {
  error: null,
  status: Status.pending,
  data: [],
};

export const BookReducer = createReducer(
  initialState,
  on(bookActions.getBooks, (state) => ({ ...state, status: Status.loading })),
  on(bookActions.getBooksSuccess, (state, books) => ({
    ...state,
    data: books.data.items as any,
    status: Status.success,
  }))
);
