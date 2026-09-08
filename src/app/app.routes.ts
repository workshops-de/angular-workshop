import { Routes } from '@angular/router';
import { Welcome } from '@workshop-support';
import { BooksPage } from './books/books-page/books-page';
import { BookCreatePage } from './books/book-create-page/book-create-page';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BooksPage
  },
  {
    path: 'books/create',
    component: BookCreatePage
  }
];
