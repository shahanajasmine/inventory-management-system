import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './product.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']

})
export class Product implements OnInit {

  products: { name: string; price: number }[] = [];
  totalValue: number = 0;
  searchText: string = '';

  newName: string = '';
  newPrice: number | null = null;
  editIndex: number | null = null;
  editingProduct: any = null;
  productToDelete: any = null;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}
   
  testClick() {
    console.log("DELETE BUTTON CLICKED");
  }
  ngOnInit(): void {
    this.products = this.productService.getProducts();
      this.updateTotalValue();
  }

  addProduct() {
    if (!this.newName || this.newPrice === null) return;

    if (this.editIndex !== null) {
      this.productService.updateProduct(this.editIndex, {
        name: this.newName,
        price: this.newPrice
      });
      this.editIndex = null;
    } else {
      this.productService.addProduct({
        name: this.newName,
        price: this.newPrice
      });
    }
        this.products = this.productService.getProducts();
        this.updateTotalValue();
      
    

    this.products = this.productService.getProducts();

    this.newName = '';
    this.newPrice = null;
  }

  deleteProduct(index: number) {
    console.log("DELETE BUTTON CLICKED", index);

    if (confirm('Are you sure you want to delete this product?')) {
      this.products.splice(index, 1);
    this.productService.saveProducts(this.products);
    this.updateTotalValue();
  }
}
  

  editProduct(index: number) {
    this.newName = this.products[index].name;
    this.newPrice = this.products[index].price;
    this.editIndex = index;
    
  }
  confirmDelete(product: any) {
    this.productToDelete = product;
  }
  deleteConfirmed() {
    if (this.productToDelete) {
      this.products = this.products.filter(
        p => p !== this.productToDelete
      );
    this.productToDelete = null;
  }
}
  cancelDelete() {
    this.productToDelete = null;
  }
  updateTotalValue(): void {
    this.totalValue = this.products.reduce((total, item) => total + item.price, 0);
  }
  get filteredProducts() {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}