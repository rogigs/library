import { mockGetOneBook } from '../services/library/library.service.mock';

export type Book = typeof mockGetOneBook.data;
export type ResponseOneBook = typeof mockGetOneBook;
