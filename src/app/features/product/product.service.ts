import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private storageKey = 'products';

  getProducts(): { name: string; price: number }[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveProducts(products: { name: string; price: number }[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  addProduct(product: { name: string; price: number }) {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }

  deleteProduct(index: number) {
    const products = this.getProducts();
    products.splice(index, 1);
    this.saveProducts(products);
  }

  updateProduct(index: number, updatedProduct: { name: string; price: number }) {
    const products = this.getProducts();
    products[index] = updatedProduct;
    this.saveProducts(products);
  }
}