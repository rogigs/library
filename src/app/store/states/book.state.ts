import { Book } from '../../types/book.types';

export enum Status {
  success = 'success',
  error = 'error',
  pending = 'pending',
  loading = 'loading',
}

export type BookState = {
  data: Book[];
  status: Status;
  error: '' | null;
};
