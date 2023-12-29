import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book } from './book';
import { BookApiService } from './book-api.service';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent, BookFilterPipe, AsyncPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private readonly bookApi = inject(BookApiService);

  bookSearchTerm = '';

  books$ = this.bookApi.getAll();

  goToBookDetails(book: Book) {
    console.log('Navigate to book details, soon...');
    console.table(book);
  }

  updateBookSearchTerm(searchTerm: string) {
    this.bookSearchTerm = searchTerm;
  }
}
