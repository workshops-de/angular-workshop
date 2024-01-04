import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BookApiService } from '../book-api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  private readonly bookApi = inject(BookApiService);
  book$!: Observable<Book>;

  @Input({ required: true })
  set isbn(isbn: string) {
    this.book$ = this.bookApi.getByIsbn(isbn);
  }
}
