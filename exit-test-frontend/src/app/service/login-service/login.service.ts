import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../../model/user/user';

// Interfaces for the request/response DTOs


export class LoginRequestDto {
  username: string = "";
  password: string = "";
}

export interface AuthResponseDto {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl + '/api/auth';

  constructor(private http: HttpClient) { }

  currentUser: AuthResponseDto = {email: '',token: ''};

  getCurrentUser(): AuthResponseDto {
    return this.currentUser
  }

  setCurrentUser(user: AuthResponseDto): void {
    this.currentUser = user;
  }


  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Login user

  login(username: string, password: string): Observable<AuthResponseDto> {
    const credentials: LoginRequestDto = {
      username: username,
      password: password
    };
    console.log(this.apiUrl, credentials);
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, credentials);
  }

  // Get CSRF token (if needed, though you mentioned it's disabled)
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/csrf-token`);
  }

  // Store token in local storage
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove token from local storage (logout)
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Get auth headers with token
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}