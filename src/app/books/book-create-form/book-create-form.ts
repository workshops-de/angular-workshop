import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

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

  protected readonly form = form(this.model, {
    submission: {
      action: formField => {
        console.log(formField().controlValue(), this.model());
        return Promise.resolve(null);
      }
    }
  });
}
