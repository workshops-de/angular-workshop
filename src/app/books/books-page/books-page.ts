import { Component, computed, inject, signal } from '@angular/core';

import { bookMatches } from '@workshop-support';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BookMarkerStore } from '../book-marker-store';
import { BooksClient } from '../books-client';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  templateUrl: './books-page.html'
})
export class BooksPage {
  booksClient = inject(BooksClient);
  bookMarkerStore = inject(BookMarkerStore);

  // Initial value comes from a non-reactive, imperative API (localStorage).
  searchTerm = signal(localStorage.getItem('books.searchTerm') ?? '');
  booksResource = this.booksClient.getAll();

  booksComputed = computed(() => {
    const markTerm = this.bookMarkerStore.markTerm();
    const books = this.booksResource.value();

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
