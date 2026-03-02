import { Component, signal } from '@angular/core';
import { Product } from "./product/product";
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Product, RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inventory-management');
  isLoginPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url ==='/';
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
