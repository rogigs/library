import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor() {}

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    // TODO: set and get token of a Cookie
    this.token = environment.TOKEN;

    return this.token;
  }
}
