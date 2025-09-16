import { Component } from '@angular/core';
import { ProductsAPI, Product } from '../../products-api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.css',
})
export class AddProductPage {
  constructor(private productsAPI: ProductsAPI, private router: Router) {}
  submit(
    id: string,
    name: string,
    desc: string,
    price: string,
    units: string,
    type: string
  ) {
    const body: Product = {
      id: Number(id),
      name,
      description: desc,
      price: Number(Number(price).toFixed(2)),
      units: Number(units),
      type,
    };
    this.productsAPI
      .add(body)
      .subscribe(() => this.router.navigate(['/products']));
  }
}
