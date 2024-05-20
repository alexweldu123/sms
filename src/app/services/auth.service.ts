import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
interface AuthenticateResponse {
  token: string;
  username: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:5225/api/User/login';

  constructor(private router: Router, private http: HttpClient) {
    const authData = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = authData ? JSON.parse(authData) : false;
  }

  /**
   * Performs authentication against the server.
   * @param {string} username - The username to authenticate with.
   * @param {string} password - The password to authenticate with.
   * @returns {Promise<Observable<boolean>>} - A promise that resolves to an observable of boolean. If the authentication is successful, the observable will emit true, otherwise false.
   */
  async login(
    username: string,
    password: string
  ): Promise<Observable<boolean>> {
    // Perform authentication
    const response: AuthenticateResponse | undefined = await this.http
      .post<AuthenticateResponse>(this.apiUrl, { username, password })
      .toPromise();
    if (!response) {
      console.log(response);
      return of(false);
    }
    console.log(response);
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('role', response.role);

    return of(true);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(): string | null {
    return localStorage.getItem('role');
  }
}
