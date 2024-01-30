import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOneBook } from '../../types/book.types';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  insertBook(data: Object) {
    return this.http.post(`${this.API}/books`, data);
  }

  getAllBooks(page: number, pageSize: number) {
    return this.http.get(`${this.API}/books?page=${page}&pageSize=${pageSize}`);
  }

  getOneBook(id: string): Observable<ResponseOneBook> {
    return this.http.get<ResponseOneBook>(`${this.API}/books/${id}`);
  }

  deleteBook(id: string) {
    return this.http.patch(`${this.API}/books/${id}/delete`, {});
  }

  updateBook(id: string, data: Object) {
    return this.http.patch(`${this.API}/books/${id}`, data);
  }
}
