import { createAction, props } from '@ngrx/store';
import { BookPagination } from '../../types/book.types';
import { ResponsePagination } from '../../types/response.types';

type Pagination = {
  page: number;
  pageSize: number;
};

const getBooks = createAction('[Books] get every books');
const getBooksSuccess = createAction(
  '[Books] get every books load success',
  props<Pick<ResponsePagination<BookPagination>, 'data'>>()
);

export const bookActions = {
  getBooks,
  getBooksSuccess,
};
