import { Component, inject } from '@angular/core';
import { Book } from './book';
import { BookApiService } from './book-api.service';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent, BookFilterPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  private readonly bookApi = inject(BookApiService);

  bookSearchTerm = '';
  books: Book[] = [];

  constructor() {
    this.bookApi
      .getAll()
      .subscribe(booksFromService => (this.books = booksFromService));
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(searchTerm: string) {
    this.bookSearchTerm = searchTerm;
  }
}
