import { Component, computed, effect, inject, signal } from '@angular/core';

import { bookMatches } from '@workshop-support';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BooksClient } from '../books-client';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  templateUrl: './books-page.html'
})
export class BooksPage {
  private readonly booksClient = inject(BooksClient);

  // Initial value comes from a non-reactive, imperative API (localStorage).
  searchTerm = signal(localStorage.getItem('books.searchTerm') ?? '');
  books = this.booksClient.getAll();

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
