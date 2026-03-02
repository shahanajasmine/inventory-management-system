import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],

})
export class Login {
  username: string = '';
  password: string = '';
  usernameError: string = '';
  passwordError: string = '';
  errorMessage: string = '';
  shake: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.usernameError = '';
    this.passwordError = '';
    this.errorMessage = '';

    let isValid = true;

    if (!this.username.trim()) {
      this.usernameError = 'Username is required';
      isValid = false;
    }
    if (!this.password.trim()) {
      this.passwordError = 'Password is required';
      isValid = false;
    } else if (this.password.length < 4) {
      this.passwordError = 'Password must be at least 4 characters';
      isValid = false;
    }
    if (!isValid) { 
      return;
    }

    //actual login check
    if (this.username === 'admin' && this.password === '2345') {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
      } else {
        console.timeLog("WRONG LOGIN");
        this.errorMessage = 'Invalid username or password';
         this.shake =true;
     
         setTimeout(() => {
          this.shake = true;
         }, 10);

        setTimeout(() => {
          this.shake = false;
        }, 500);
      }

  }
  
}
