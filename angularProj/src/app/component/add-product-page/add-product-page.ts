import { Component, OnInit } from '@angular/core';
import { ProductsAPI, Product } from '../../products-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.css',
})
export class AddProductPage implements OnInit {
  ngOnInit() {}
}
