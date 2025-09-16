import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsAPI, Product } from '../../products-api';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-page.html',
})
export class ProductPage {
  items: Product[] = [];
  constructor(private productsAPI: ProductsAPI) {}
  ngOnInit() {
    this.load();
  }

  load() {
    this.productsAPI.getAll().subscribe((dis) => (this.items = dis));
  }

  remove(id: number) {
    this.productsAPI.remove(id).subscribe(() => this.load());
  }
}
