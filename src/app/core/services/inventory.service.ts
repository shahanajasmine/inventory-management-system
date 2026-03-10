import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private products: Product[] = [];

  constructor() {
    const savedProducts = localStorage.getItem('products');

    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.saveToLocalStorage();
  }

  updateProduct(index: number, product: Product) {
    this.products[index] = product;
    this.saveToLocalStorage();
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.saveToLocalStorage();
  }
}