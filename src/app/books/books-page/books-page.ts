import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { bookMatches } from '@workshop-support';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BooksClient } from '../books-client';

@Component({
  selector: 'app-books-page',
  imports: [BookCard, RouterLink],
  templateUrl: './books-page.html'
})
export class BooksPage {
  private readonly booksClient = inject(BooksClient);

  // Initial value comes from a non-reactive, imperative API (localStorage).
  searchTerm = signal(localStorage.getItem('books.searchTerm') ?? '');
  booksResource = this.booksClient.getAll();

  booksComputed = computed(() => {
    const searchTerm = this.searchTerm();
    const books = this.booksResource.value();

    return books.filter(book => bookMatches(book, searchTerm));
  });

  constructor() {
    effect(() => {
      localStorage.setItem('books.searchTerm', this.searchTerm());
    });
  }

  async deleteBook(book: Book) {
    if (!window.confirm(`Delete "${book.title}"?`)) {
      return;
    }

    await lastValueFrom(this.booksClient.delete(book.isbn));
    this.booksResource.reload();
  }
}
