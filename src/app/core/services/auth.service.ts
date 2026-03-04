import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '2345') {
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}