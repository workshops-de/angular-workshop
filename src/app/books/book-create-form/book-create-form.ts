import { Component, inject, output, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { BooksClient } from '../books-client';
import { validAuthorName } from '../validators/author';
import { uniqueIsbn } from '../validators/isbn';

@Component({
  selector: 'app-book-create-form',
  imports: [FormField, FormRoot],
  templateUrl: './book-create-form.html'
})
export class BookCreateForm {
  private readonly booksClient = inject(BooksClient);

  // Tells the page that the book has been saved.
  readonly saved = output<void>();

  protected readonly model = signal({
    isbn: '',
    title: '',
    subtitle: '',
    author: '',
    abstract: ''
  });

  protected readonly form = form(
    this.model,
    schemaPath => {
      required(schemaPath.isbn, { message: 'Please insert an ISBN.' });
      uniqueIsbn(schemaPath.isbn);
      required(schemaPath.title, { message: 'Please insert a title.' });
      required(schemaPath.author, { message: 'Please insert an Author.' });
      validAuthorName(schemaPath.author);
    },
    {
      submission: {
        action: async () => {
          try {
            await firstValueFrom(this.booksClient.create(this.model()));
            this.saved.emit();
            return null;
          } catch {
            return { kind: 'server', message: 'Failed to create book' };
          }
        }
      }
    }
  );
}
