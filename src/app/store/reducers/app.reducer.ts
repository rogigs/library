import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { BookReducer } from './book.reducer';

export const appReducers: ActionReducerMap<IAppState> = {
  books: BookReducer,
};
