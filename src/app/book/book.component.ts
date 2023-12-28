import { Component } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';
import { Book } from './book';
import { CommonModule } from '@angular/common';
import { BookApiService } from './book-api.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BookFilterPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  bookSearchTerm = '';
  books: Book[] = [];

  constructor(private readonly bookApi: BookApiService) {
    this.bookApi
      .getAll()
      .subscribe(booksFromService => (this.books = booksFromService));
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(input: Event) {
    this.bookSearchTerm = (input.target as HTMLInputElement).value;
  }
}
