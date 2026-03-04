import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Layout } from './features/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { ProductComponent } from './features/product/product';
import { Categories } from './features/categories/categories';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: '',
    component:Layout,
    canActivate: [authGuard],
    children: [
  { path: 'dashboard', component: Dashboard },
  { path: 'inventory', component: ProductComponent },
  { path: 'categories', component: Categories },
  { path: '',redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: 'login' }
];