import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
   login(username: string, password: string): boolean {
    if (username === 'admin' && password === '2345') {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }
  logout() : void {
    localStorage.removeItem('isLoggedIn');
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }  
}
