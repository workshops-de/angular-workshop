import { Component, computed, effect, signal } from '@angular/core';

import { bookMatches } from '@workshop-support';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  templateUrl: './books-page.html'
})
export class BooksPage {
  // Initial value comes from a non-reactive, imperative API (localStorage).
  searchTerm = signal(localStorage.getItem('books.searchTerm') ?? '');
  books = signal<Book[]>([
    {
      title: 'How to win friends',
      author: 'Dale Carnegie',
      publishedAt: new Date('1936-10-01')
    },
    {
      title:
        'The Willpower Instinct: How Self-Control Works, Why It Matters, and What You Can Do to Get More of It',
      author: 'Kelly McGonigal',
      publishedAt: new Date('2011-12-29')
    },
    {
      author: 'Simon Sinek',
      title: 'Start with WHY',
      publishedAt: new Date('2009-10-29')
    }
  ]);

  booksComputed = computed(() => {
    const searchTerm = this.searchTerm();
    const books = this.books();

    return books.filter(book => bookMatches(book, searchTerm));
  });

  constructor() {
    effect(() => {
      localStorage.setItem('books.searchTerm', this.searchTerm());
    });
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  deleteBook(book: Book) {
    console.log('Delete book, soon...');
    console.table(book);
  }
}
