import { Component, signal } from '@angular/core';

import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  templateUrl: './books-page.html'
})
export class BooksPage {
  book = signal({
    title: 'How to win friends',
    author: 'Dale Carnegie',
    publishedAt: new Date('1936-10-01')
  });
}
