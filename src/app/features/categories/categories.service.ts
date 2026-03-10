import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private storageKey = 'categories';

  // Get all categories
  getCategories() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Save categories
  saveCategories(categories: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

  // Add new category
  addCategory(category: any) {
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategories(categories);
  }

  // Delete category
  deleteCategory(id: number) {
    const categories = this.getCategories().filter((c:any) => c.id !== id);
    this.saveCategories(categories);
  }

}