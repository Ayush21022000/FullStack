import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategories: Set<string> = new Set();
  searchControl = new FormControl('');
  selectedProduct: any | null = null; // This will hold the product selected for the modal
  loading = true; // Added loading state
  loadingModal = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    localStorage.setItem('isUserLoggedIn', 'true');
    // Filter products based on search input
    this.searchControl.valueChanges.subscribe(() => {
      this.filterProducts();
    });
  }

  fetchProducts(): void {
    const apiUrl = 'https://fakestoreapi.com/products'; // Replace with your API
    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.products = data.map((item: any, index) => ({
        id: item.id,
        name: item.title,
        category: item.category,
        price: item.price,
        image: item.image,
      }));

      this.categories = Array.from(
        new Set(this.products.map((product) => product.category))
      );
      this.filteredProducts = this.products;

      this.loading = false;

    });
  }

  toggleCategory(category: string, event: Event): void {
    // console.log(category);
    if (category == 'men') {
      category = "men's clothing";
    }
    if (category == 'women') {
      category = "women's clothing";
    }
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    const search = this.searchControl.value?.toLowerCase() || '';
    const selectedCategories = Array.from(this.selectedCategories);

    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    });
  }
  viewDetails(product: any): void {
    this.loadingModal = true;
    // console.log(product, 'product');
    this.selectedProduct = product;
    const selectedProductId = product.id;
    const apiUrl = `https://fakestoreapi.com/products/${selectedProductId}`; // Replace with your API
    this.http.get<any[]>(apiUrl).subscribe((data) => {
      // console.log(data);
      this.selectedProduct = data;
      this.loadingModal = false;
    });
  }

  closeModal(): void {
    this.selectedProduct = null; // Close the modal
  }
}
