import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

@Component({
  selector: 'app-book-create-form',
  imports: [FormField, FormRoot],
  templateUrl: './book-create-form.html'
})
export class BookCreateForm {
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
      required(schemaPath.title, { message: 'Please insert a title.' });
      required(schemaPath.author, { message: 'Please insert an Author.' });
    },
    {
      submission: {
        action: formField => {
          console.log(formField().controlValue(), this.model());
          return Promise.resolve(null);
        }
      }
    }
  );
}
