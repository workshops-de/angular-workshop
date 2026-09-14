import { Component, computed, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { bookMatches } from '@workshop-support';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BookMarkerStore } from '../book-marker-store';
import { BooksClient } from '../books-client';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  providers: [BookMarkerStore],
  templateUrl: './books-page.html'
})
export class BooksPage {
  booksClient = inject(BooksClient);
  bookMarkerStore = inject(BookMarkerStore);

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

  async deleteBook(book: Book) {
    if (!window.confirm(`Delete "${book.title}"?`)) {
      return;
    }

    await lastValueFrom(this.booksClient.delete(book.isbn));
    this.booksResource.reload();
  }
}
