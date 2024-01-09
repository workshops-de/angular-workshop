import { Routes } from '@angular/router';
import { Welcome } from './lib/shell/welcome/welcome';
import { isUserAuthenticatedGuardFn } from './is-user-authenticated';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: () => import('./books/book.routes').then(mod => mod.bookRoutes),
    canMatch: [isUserAuthenticatedGuardFn]
  }
];
