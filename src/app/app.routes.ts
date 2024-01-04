import { Routes } from '@angular/router';
import { AboutPage } from './about/about-page';
import { BooksPage } from './books/books-page';

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
    component: BooksPage
  }
];
