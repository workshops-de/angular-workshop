import { Routes } from '@angular/router';
import { LoginHint, Welcome } from '@workshop-support';

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
  },
  {
    // canMatch rejected the route above, so the router keeps looking and lands here.
    path: 'books',
    component: LoginHint
  }
];
