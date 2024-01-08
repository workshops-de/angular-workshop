import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-book-new',
  imports: [FormField, FormRoot],
  templateUrl: './book-new-page.html'
})
export class BookNewPage {
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
