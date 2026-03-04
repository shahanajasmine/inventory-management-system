import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}