import { Component, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { BooksClient } from '../books-client';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [AsyncPipe],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly booksClient = inject(BooksClient);

  book$: Observable<Book>;

  constructor() {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.booksClient.getByIsbn(params?.['isbn']))
    );
  }
}
