import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { BookApiService } from '../book-api.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  book$: Observable<Book>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookApi: BookApiService
  ) {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.bookApi.getByIsbn(params?.['isbn']))
    );
  }
}
