import { Routes } from '@angular/router';
import { AboutPage } from './about/about-page';
import { isUserAuthenticatedGuardFn } from './is-user-authenticated';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'books',
    loadChildren: () => import('./books/book.routes').then(mod => mod.bookRoutes),
    canMatch: [isUserAuthenticatedGuardFn]
  }
];
