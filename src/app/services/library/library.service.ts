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
}
