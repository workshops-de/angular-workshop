import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { validAuthorName } from '../validators/author.validator';

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
    author: '',
    abstract: ''
  });

  protected readonly form = form(
    this.model,
    schemaPath => {
      required(schemaPath.isbn);
      required(schemaPath.title);
      required(schemaPath.author);
      validAuthorName(schemaPath.author);
    },
    {
      submission: {
        action: async () => {
          await firstValueFrom(this.bookApiService.create(this.model()));
          return null;
        }
      }
    }
  );
}
