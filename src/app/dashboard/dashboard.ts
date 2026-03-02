import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService,Product } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  products: Product[] = [];
  totalProducts = 0;
  lowStock = 0;
  categories = 0;
  totalSales = 0;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ){
    this.products = this.inventoryService.getProducts();
    this.calculateStats();
  }
  calculateStats() {
    this.totalProducts = this.products.length;

    this.lowStock = this.products.filter(p => p.stock < 10.).length;

    const uniqueCategories = new Set(this.products.map(p => p.category));
    this.categories = uniqueCategories.size;

    this.totalSales = this.products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }

}
