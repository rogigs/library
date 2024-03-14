import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Book,
  BookForm,
  BookItem,
  BookPagination,
  BookSearch,
} from '../../types/book.types';
import { Response, ResponsePagination } from '../../types/response.types';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  insertBook(data: BookForm): Observable<Book> {
    return this.http.post<Book>(`${this.API}/books`, data);
  }

  searchBook(name: string): Observable<Response<BookSearch[]>> {
    return this.http.get<Response<BookSearch[]>>(
      `${this.API}/books/search?name=${name}`
    );
  }

  getAllBooks(
    page: number,
    pageSize: number
  ): Observable<ResponsePagination<BookPagination>> {
    return this.http.get<ResponsePagination<BookPagination>>(
      `${this.API}/books/pagination?page=${page}&pageSize=${pageSize}`
    );
  }

  getOneBook(id: string): Observable<Response<Book>> {
    return this.http.get<Response<Book>>(`${this.API}/books/find/${id}`);
  }

  deleteBook(id: string) {
    return this.http.patch(`${this.API}/books/${id}/delete`, {});
  }

  updateBook(id: string, data: BookForm) {
    return this.http.patch(`${this.API}/books/${id}`, data);
  }

  getAllCategory(): Observable<Response<BookItem>> {
    return this.http.get<Response<BookItem>>(`${this.API}/categories/`);
  }

  getAllLanguages(): Observable<Response<BookItem>> {
    return this.http.get<Response<BookItem>>(`${this.API}/languages/`);
  }
}
