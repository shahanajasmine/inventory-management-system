import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {

  categories: Category[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  addCategory() {
    if (!this.newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      name: this.newCategoryName
    };

    this.categories.push(newCategory);
    this.categoryService.saveCategories(this.categories);

    this.newCategoryName = '';
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
    this.categoryService.saveCategories(this.categories);
  }
}