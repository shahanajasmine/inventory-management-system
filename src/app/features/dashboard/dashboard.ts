import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, Product } from '../../core/services/inventory.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  products: Product[] = [];
  totalProducts: number = 0;
  lowStock: number = 0;
  categories: number = 0;
  totalSales: number = 0;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.loadStats();
    })
  }

  ngOnInit(): void {
    this.products = this.inventoryService.getProducts() || [];
    this.calculateStats();
  }
  loadStats(): void{
    this.products = this.inventoryService.getProducts() || [];
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalProducts = this.products.length;

    this.lowStock = this.products.filter(
      (p: Product) => p.stock < 10
    ).length;

    const uniqueCategories = new Set(
      this.products.map((p: Product) => p.category)
    );

    this.categories = uniqueCategories.size;

    this.totalSales = this.products.reduce(
      (sum: number, p: Product) => sum + (p.price * p.stock),
      0
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
