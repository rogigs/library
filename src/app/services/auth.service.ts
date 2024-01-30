import { Injectable } from '@angular/core';

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
    // TODO: get token of a Cookie
    this.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJpYXQiOjE3MDY1NTk3MDEsImV4cCI6MTczODExNzMwMX0.YcGpAK0s42VmRyF8ADVmD0RG7mIVFPvAerEPc5rZxq0';
    return this.token;
  }
}
