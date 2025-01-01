import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private readonly TOKEN_KEY = 'isUserLoggedIn'; // Key to store token in localStorage

  login(email: string, password: string) {
    return this.http.post('http://localhost:4000/api/auth/login', {
      email,
      password,
    });
  }
  signup(name: string, email: string, password: string) {
    return this.http.post('http://localhost:4000/api/auth/signup', {
      name,
      email,
      password,
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Save the JWT token to localStorage
  loginUser(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Remove the token and log the user out
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
