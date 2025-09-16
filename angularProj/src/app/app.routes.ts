import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./component/product-page/product-page').then(
        (m) => m.ProductPage
      ),
  },
  {
    path: 'add-product',
    loadComponent: () =>
      import('./component/add-product-page/add-product-page').then(
        (m) => m.AddProductPage
      ),
  },
  {
    path: 'edit-product/:id',
    loadComponent: () =>
      import('./component/update-product-page/update-product-page').then(
        (m) => m.UpdateProductPage
      ),
  },
];
