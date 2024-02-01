import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BookForm,
  ResponseBookPagination,
  ResponseItem,
  ResponseOneBook,
  ResponseSearchBook,
} from '../../types/book.types';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  insertBook(data: BookForm): Observable<ResponseOneBook> {
    return this.http.post<ResponseOneBook>(`${this.API}/books`, data);
  }

  searchBook(name: string): Observable<ResponseSearchBook> {
    return this.http.get<ResponseSearchBook>(
      `${this.API}/books/search?name=${name}`
    );
  }

  getAllBooks(
    page: number,
    pageSize: number
  ): Observable<ResponseBookPagination> {
    return this.http.get<ResponseBookPagination>(
      `${this.API}/books/pagination?page=${page}&pageSize=${pageSize}`
    );
  }

  getOneBook(id: string): Observable<ResponseOneBook> {
    return this.http.get<ResponseOneBook>(`${this.API}/books/find/${id}`);
  }

  // TODO: add types response when change value of body in server
  deleteBook(id: string) {
    return this.http.patch(`${this.API}/books/${id}/delete`, {});
  }

  updateBook(id: string, data: BookForm) {
    return this.http.patch(`${this.API}/books/${id}`, data);
  }

  getAllCategory(): Observable<ResponseItem> {
    return this.http.get<ResponseItem>(`${this.API}/categories/`);
  }

  getAllLanguages(): Observable<ResponseItem> {
    return this.http.get<ResponseItem>(`${this.API}/languages/`);
  }
}
