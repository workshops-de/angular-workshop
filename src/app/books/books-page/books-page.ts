import { Component, computed, inject, signal } from '@angular/core';

import { bookMatches } from '@workshop-support';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BookMarkerStore } from '../book-marker-store';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  templateUrl: './books-page.html'
})
export class BooksPage {
  bookMarkerStore = inject(BookMarkerStore);

  // Initial value comes from a non-reactive, imperative API (localStorage).
  books = signal([
    {
      id: 'how-to-win-friends',
      title: 'How to win friends',
      author: 'Dale Carnegie',
      publishedAt: new Date('1936-10-01')
    },
    {
      id: 'the-willpower-instinct',
      title:
        'The Willpower Instinct: How Self-Control Works, Why It Matters, and What You Can Do to Get More of It',
      author: 'Kelly McGonigal',
      publishedAt: new Date('2011-12-29')
    },
    {
      id: 'start-with-why',
      author: 'Simon Sinek',
      title: 'Start with WHY',
      publishedAt: new Date('2009-10-29')
    }
  ]);

  booksComputed = computed(() => {
    const markTerm = this.bookMarkerStore.markTerm();
    const books = this.books();

    return books.filter(book => bookMatches(book, markTerm));
  });

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  deleteBook(book: Book) {
    console.log('Delete book, soon...');
    console.table(book);
  }
}
