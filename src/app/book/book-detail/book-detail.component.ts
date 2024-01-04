import { Component, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { BookApiService } from '../book-api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [AsyncPipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly bookApi = inject(BookApiService);

  book$: Observable<Book>;

  constructor() {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.bookApi.getByIsbn(params?.['isbn']))
    );
  }
}
