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
  // this is my empty array that holds the products.
  items: Product[] = [];
  constructor(private productsAPI: ProductsAPI) {}
  ngOnInit() {
    // to fetch from the back end.
    this.load();
  }

  // call my productsAPI service to get all the products from backend. localhost:whatever/products. need to use subscribe because httpClient.get() returns an observable. when data is recived 'dis' is my array with the products. and them we need to display them

  load() {
    this.productsAPI.getAll().subscribe((dis) => (this.items = dis));
  }
  // delete the product, then reload the list again so it refreshes and updates
  remove(id: number) {
    this.productsAPI.remove(id).subscribe(() => this.load());
  }
}
