import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  category: string;
  stock: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private products: Product[] = [
    { name: 'Laptop', category: 'Electronics', stock: 12, price: 50000 },
    { name: 'Keyboard', category: 'Accessories', stock: 30, price: 800 },
    { name: 'Mouse', category: 'Accessories', stock: 5, price: 500 },
    { name: 'Monitor', category: 'Electronics', stock: 3, price: 15000 }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  updateProduct(index: number, product: Product) {
    this.products[index] = product;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }
}