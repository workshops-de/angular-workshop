import { Routes } from '@angular/router';
import { BooksPage } from './books-page';
import { confirmLeaveGuardFn } from './confirm-leave';
import { BookNewPage } from './book-new/book-new-page';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'new',
    component: BookNewPage
  },
  {
    path: 'detail/:isbn',
    loadComponent: () => import('./book-detail-page/book-detail-page').then(c => c.BookDetailPage),
    canDeactivate: [confirmLeaveGuardFn]
  },
  {
    path: 'edit/:isbn',
    loadComponent: () =>
      import('./book-edit/book-edit-page').then(c => c.BookEditPage)
  }
];
