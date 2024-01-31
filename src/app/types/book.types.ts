import {
  mockGetBookPagination,
  mockGetOneBook,
  mockSearchBook,
} from '../services/library/library.service.mock';

export type BookForm = {
  name: string;
  image: {
    id?: string;
    src: string;
    alt: string;
  };
  publisher: string;
  author: string;
  year: string;
  language: string; // TODO: could be a entity
  description: string;
  category: string;
};

export type Book = typeof mockGetOneBook.data;
export type ResponseSearchBook = typeof mockSearchBook.data;
export type ResponseOneBook = typeof mockGetOneBook;
export type ResponseBookPagination = typeof mockGetBookPagination;
