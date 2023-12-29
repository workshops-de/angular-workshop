import { Component, inject, OnInit } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';
import { Book } from './book';
import { BookApiService } from './book-api.service';
import { EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent, BookFilterPipe, AsyncPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  private readonly bookApi = inject(BookApiService);

  bookSearchTerm = '';
  books$: Observable<Book[]> = EMPTY;

  ngOnInit(): void {
    this.books$ = this.bookApi.getAll();
  }

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(input: Event) {
    this.bookSearchTerm = (input.target as HTMLInputElement).value;
  }
}
