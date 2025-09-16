import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsAPI, Product } from '../../products-api';

@Component({
  selector: 'app-update-product-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './update-product-page.html',
  styleUrl: './update-product-page.css',
})
export class UpdateProductPage implements OnInit {
  productID = 0;
  any: any = {};

  constructor(
    private route: ActivatedRoute,
    private api: ProductsAPI,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productID = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getAll().subscribe((list) => {
      this.any = list.find((p) => p.id === this.productID) || {};
    });
  }
  saveupdate(
    name: string,
    desc: string,
    price: string,
    units: string,
    type: string
  ) {
    this.api
      .update(this.productID, {
        name,
        description: desc,
        price: Number(price),
        units: Number(units),
        type,
      })
      .subscribe(() => this.router.navigate(['/products']));
  }
}
