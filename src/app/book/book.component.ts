import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';
import { Book } from './book';
import { CommonModule } from '@angular/common';
import { BookApiService } from './book-api.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BookFilterPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  bookSearchTerm = '';
  books$: Observable<Book[]> = EMPTY;

  constructor(private readonly bookApi: BookApiService) {}

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
