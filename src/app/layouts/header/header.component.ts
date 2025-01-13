import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { HttpClientModule } from '@angular/common/http';

interface FrameworkNode {
  name: string; // Represents Course or Framework name
  children?: FrameworkNode[]; // Frameworks are children of Courses
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Fix for typo in `styleUrl`
})
export class HeaderComponent {
  categories: any[] = [];
  hoveredCategory: any = null; // Track hovered category
  isMenuOpen = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  
}
