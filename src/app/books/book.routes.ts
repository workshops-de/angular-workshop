import { Routes } from '@angular/router';
import { BooksPage } from './books-page/books-page';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'create',
    loadComponent: () => import('./book-create-page/book-create-page').then(c => c.BookCreatePage)
  },
  {
    path: 'detail/:isbn',
    loadComponent: () => import('./book-detail-page/book-detail-page').then(c => c.BookDetailPage)
  }
];
