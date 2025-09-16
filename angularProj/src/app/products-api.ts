import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// tell TS what a product looks like
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  units: number;
  type: string;
};

// make class a service by usingg @Injectable decorator
@Injectable({ providedIn: 'root' })
export class ProductsAPI {
  private base = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // get all products from the backend API and return an observable which can give me the data and put into the products array.
  // so this goes component->productsAPI->node->mongodb

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  add(prods: Product) {
    return this.http.post('http://localhost:3000/products', prods);
  }

  update(id: number, prods: Partial<Product>) {
    return this.http.put(`http://localhost:3000/products/${id}`, prods);
  }

  remove(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
