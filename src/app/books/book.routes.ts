import { Routes } from '@angular/router';
import { BooksPage } from './books-page';
import { confirmLeaveGuardFn } from './confirm-leave';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'detail/:isbn',
    loadComponent: () => import('./book-detail-page/book-detail-page').then(c => c.BookDetailPage),
    canDeactivate: [confirmLeaveGuardFn]
  }
];
