import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BookApiService } from '../book-api.service';

@Component({
  selector: 'app-book-detail',
  imports: [AsyncPipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  private readonly bookApi = inject(BookApiService);
  book$!: Observable<Book>;

  isbn = input.required<string>();

  constructor() {
    effect(() => this.getBookByIsbn(this.isbn()));
  }

  private getBookByIsbn(isbn: string): void {
    this.book$ = this.bookApi.getByIsbn(isbn);
  }
}
