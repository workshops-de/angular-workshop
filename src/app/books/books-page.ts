import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookCard } from './book-card/book-card';
import { BooksClient } from './books-client';

@Component({
  selector: 'app-book',
  imports: [BookCard, RouterLink],
  templateUrl: './books-page.html'
})
export class BooksPage {
  private readonly booksClient = inject(BooksClient);

  searchTerm = signal('');
  booksResource = this.booksClient.getAll();

  booksComputed = computed(() => {
    const searchTerm = this.searchTerm().toLocaleLowerCase();
    //            this.books()
    const books = this.booksResource.value();

    return !searchTerm
      ? books
      : books?.filter(book => book.title.toLocaleLowerCase().includes(searchTerm));
  });
}
