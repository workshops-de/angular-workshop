import { Routes } from '@angular/router';
import { BooksPage } from './books-page';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'detail/:isbn',
    loadComponent: () =>
      import('./book-detail/book-detail-page').then(c => c.BookDetailPage)
  }
];
