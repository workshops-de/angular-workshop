import { Component, inject, signal } from '@angular/core';
import { applyEach, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
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
    abstract: ''
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
          // Backend unterstützt aktuell nur einen Autor
          const firstAuthor = this.model().authors[0] || 'n/a';
          await firstValueFrom(this.booksClient.create({ ...this.model(), author: firstAuthor }));
          return null;
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
