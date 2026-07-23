import { Component, inject, signal } from '@angular/core';
import { applyEach, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { validAuthorName } from '../validators/author.validator';
import { uniqueIsbn } from '../validators/isbn.validator';

@Component({
  selector: 'app-book-new',
  imports: [FormField, FormRoot],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  private readonly bookApiService = inject(BookApiService);

  protected readonly model = signal({
    isbn: '',
    title: '',
    subtitle: '',
    authors: [''],
    abstract: ''
  });

  protected readonly form = form(
    this.model,
    schemaPath => {
      required(schemaPath.isbn);
      minLength(schemaPath.isbn, 5);
      uniqueIsbn(schemaPath.isbn, this.bookApiService);
      required(schemaPath.title);
      applyEach(schemaPath.authors, author => {
        required(author);
        validAuthorName(author);
      });
    },
    {
      submission: {
        action: async () => {
          // We need to handle the authors array now separately
          // Unfortunately the backend doesn't handle multiple authors yet
          const firstAuthor = this.model().authors[0] || 'n/a';
          await firstValueFrom(
            this.bookApiService.create({ ...this.model(), author: firstAuthor })
          );
          return null;
        }
      }
    }
  );

  addAuthor() {
    this.model.update(m => ({ ...m, authors: [...m.authors, ''] }));
  }

  deleteAuthor(authorIndex: number) {
    this.model.update(m => ({
      ...m,
      authors: m.authors.filter((_, index) => index !== authorIndex)
    }));
  }
}
