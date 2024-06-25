import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './pages/products/list/list.component';
import { DetailComponent } from './pages/products/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ListComponent,
  },
  {
    path: 'detais/:id',
    component: DetailComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
