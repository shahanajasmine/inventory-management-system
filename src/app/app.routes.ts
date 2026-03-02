import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Product } from './product/product';
import { Categories } from './categories/categories';

export const routes: Routes = [
  { path: '', component: Login },
  { path: '',
    component:Layout,
    children: [
  { path: 'dashboard', component: Dashboard },
  { path: 'inventory', component: Product },
  { path: 'categories', component: Categories },
  { path: '',redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: 'login' }
];