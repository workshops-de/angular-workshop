import { Routes } from '@angular/router';
import { BooksPage } from './books-page/books-page';
import { confirmLeaveGuard } from './confirm-leave-guard';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'create',
    loadComponent: () => import('./book-create-page/book-create-page').then(c => c.BookCreatePage),
    canDeactivate: [confirmLeaveGuard]
  },
  {
    path: 'detail/:isbn',
    loadComponent: () => import('./book-detail-page/book-detail-page').then(c => c.BookDetailPage)
  }
];
