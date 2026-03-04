import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService, Product } from '../../core/services/inventory.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']

})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  totalValue: number = 0;
  searchText: string = '';

  newName: string = '';
  newPrice: number | null = null;
  editIndex: number | null = null;
  editingProduct: any = null;
  productToDelete: any = null;

  constructor(
    private router: Router,
    private inventoryService: InventoryService
  ) {}
   
  testClick() {
    console.log("DELETE BUTTON CLICKED");
  }
  ngOnInit(): void {
    this.products = this.inventoryService.getProducts();
      this.updateTotalValue();
  }

  addProduct() {
    if (!this.newName || this.newPrice === null) return;

    const newProduct: Product = {
      name: this.newName,
      category: 'General',
      stock: 1,
      price: this.newPrice
    };

    if (this.editIndex !== null) {
      this.inventoryService.updateProduct(this.editIndex, newProduct);
      this.editIndex = null;
    } else{
      this.inventoryService.addProduct(newProduct);
   }
        this.products = this.inventoryService.getProducts();
        this.updateTotalValue();
    

    this.newName = '';
    this.newPrice = null;
  }

  deleteProduct(index: number) {

    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteProduct(index);
      this.products = this.inventoryService.getProducts();
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