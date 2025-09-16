import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
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
