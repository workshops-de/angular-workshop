import { Component, inject, input, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { form, FormField, FormRoot, readonly, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { validAuthorName } from '../validators/author.validator';

const emptyBookForm = {
  isbn: '',
  title: '',
  subtitle: '',
  author: '',
  abstract: ''
};

@Component({
  selector: 'app-book-edit',
  imports: [FormField, FormRoot],
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {
  private readonly bookApiService = inject(BookApiService);

  protected readonly isbn = input.required<string>();

  private readonly bookResource = rxResource({
    params: this.isbn,
    stream: ({ params: isbn }) => this.bookApiService.getByIsbn(isbn)
  });

  protected readonly model = linkedSignal(() => ({
    ...emptyBookForm,
    ...this.bookResource.value()
  }));

  protected readonly form = form(
    this.model,
    schemaPath => {
      // The ISBN is the book's identifier - it can be displayed, but not changed
      readonly(schemaPath.isbn);
      required(schemaPath.title);
      required(schemaPath.author);
      validAuthorName(schemaPath.author);
    },
    {
      submission: {
        action: async () => {
          await firstValueFrom(this.bookApiService.update(this.isbn(), this.model()));
          return null;
        }
      }
    }
  );
}
