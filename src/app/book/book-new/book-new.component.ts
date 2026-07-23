import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

@Component({
  selector: 'app-book-new',
  imports: [FormField, FormRoot],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
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
    },
    {
      submission: {
        action: formField => {
          console.log(formField().controlValue(), this.model());
          // No validation errors
          return Promise.resolve(null);
        }
      }
    }
  );
}
