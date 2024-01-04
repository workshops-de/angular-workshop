import { Routes } from '@angular/router';
import { AboutPage } from './about/about-page';
import { BookDetailPage } from './books/book-detail-page/book-detail-page';
import { BooksPage } from './books/books-page';
import { BookDetailPage } from './books/book-detail/book-detail-page';

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
  },
  {
<<<<<<< Updated upstream
    path: 'books/detail/:isbn',
=======
    path: 'books/details/:isbn',
>>>>>>> Stashed changes
    component: BookDetailPage
  }
];
