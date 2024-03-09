import {
  book,
  bookItem,
  bookPagination,
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
  language: string;
  description: string;
  category: string;
};

export type Book = typeof book;
export type BookSearch = typeof bookPagination;
export type BookPagination = typeof bookPagination;
export type BookItem = typeof bookItem;
