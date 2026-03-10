import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private storageKey = 'categories';

  getCategories() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveCategories(categories: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

}