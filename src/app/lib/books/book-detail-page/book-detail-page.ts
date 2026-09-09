import { Component, signal } from '@angular/core';

import { Book } from '../book';
import { BookDetail } from '../book-detail/book-detail';

// Prepared template - copy this folder to src/app/books/book-detail-page/ and
// wire the data: read the :isbn route param via an input and load the book with
// httpResource, then pass it to <app-book-detail>. The sample book below only
// exists so the prepared view renders on its own.
@Component({
  selector: 'app-book-detail-page',
  imports: [BookDetail],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  protected readonly book = signal<Book>({
    id: '3f7a1c2e-9b4d-4e8a-9c1f-2d6b8e4a7c50',
    isbn: '978-3-86490-000-0',
    title: 'Angular',
    subtitle: 'Fundamentals, advanced techniques and best practices',
    abstract:
      'Fundamentals, advanced techniques and best practices for building large, ' +
      'maintainable single-page applications with the Angular framework. This book ' +
      'covers components, the router, reactive forms and signals from first ' +
      'principles to production patterns, with worked examples throughout.',
    author: 'Ferdinand Malcher',
    publisher: 'dpunkt.verlag',
    price: 44.9,
    currency: 'EUR',
    numPages: 384,
    cover: '',
    publishedAt: '2023-03-15',
    coAuthors: ['Johannes Hoppe', 'Danny Koppenhagen', 'Gregor Woiwode'],
    createdAt: '2023-03-15T00:00:00Z',
    updatedAt: '2023-03-15T00:00:00Z'
  });
}
