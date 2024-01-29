import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getOneBook(id: string) {
    return this.http.get(`${this.API}/books/${id}`);
  }

  deleteBook(id: string, user: string) {
    return this.http.patch(`${this.API}/books/${id}/user/${user}`, {});
  }

  updateBook(id: string, data: Object) {
    return this.http.patch(`${this.API}/books/${id}/user/1`, data);
  }
}
