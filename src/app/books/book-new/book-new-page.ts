import { Component, inject, signal } from '@angular/core';
import { applyEach, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Book } from '../book';
import { BooksClient } from '../books-client';
import { validAuthorName } from '../validators/author';
import { uniqueIsbn } from '../validators/isbn';

@Component({
  selector: 'app-book-new',
  imports: [FormField, FormRoot],
  templateUrl: './book-new-page.html'
})
export class BookNewPage {
  private readonly booksClient = inject(BooksClient);

  protected readonly model = signal({
    isbn: '',
    title: '',
    subtitle: '',
    authors: [''],
    abstract: '',
    cover: ''
  });

  protected readonly form = form(
    this.model,
    schemaPath => {
      required(schemaPath.isbn, { message: 'Please insert an ISBN.' });
      uniqueIsbn(schemaPath.isbn);
      required(schemaPath.title, { message: 'Please insert a title.' });
      applyEach(schemaPath.authors, author => {
        required(author, { message: 'Please insert an Author.' });
        validAuthorName(author);
      });
    },
    {
      submission: {
        action: async () => {
          try {
            // TODO: The API only supports a single author per book
            const book: Book = { ...this.model(), author: this.model().authors[0] };

            await firstValueFrom(this.booksClient.create(book));
            return null;
          } catch {
            return { kind: 'server', message: 'Failed to create book' };
          }
        }
      }
    }
  );

  addAuthor() {
    this.model.update(m => ({ ...m, authors: [...m.authors, ''] }));
  }

  deleteAuthor(authorIndex: number) {
    this.model.update(m => ({ ...m, authors: m.authors.filter((_, i) => i !== authorIndex) }));
  }
}
