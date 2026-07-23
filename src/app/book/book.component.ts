import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Book } from './book';
import { BookApiService } from './book-api.service';
import { BookCardComponent } from './book-card/book-card.component';
import { BookFilterPipe } from './book-filter/book-filter.pipe';

@Component({
  selector: 'app-book',
  imports: [BookCardComponent, BookFilterPipe, RouterLink],
  templateUrl: './book.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book.component.scss'
})
export class BookComponent {
  private readonly bookApi = inject(BookApiService);
  private readonly router = inject(Router);

  bookSearchTerm = '';

  books = toSignal(this.bookApi.getAll());

  goToBookDetails(book: Book) {
    this.router.navigate(['books', 'detail', book.isbn]);
  }

  updateBookSearchTerm(searchTerm: string) {
    this.bookSearchTerm = searchTerm;
  }
}
