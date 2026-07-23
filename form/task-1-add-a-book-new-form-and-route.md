# Add a BookNew Form and Route

ca. 15 min

- Create a new Component `BookNewComponent` for the Book-Feature with `ng generate component book/book-new`
- Configure a new Route inside the `book.routes.ts` file, displaying the `BookNewComponent` (path: `new`)
- Add a link from `BookComponent` with `routerLink` to the new route.
- Add `FormField` and `FormRoot` (both from `@angular/forms/signals`) to the imports-Array of the
  `BookNewComponent`
- Inside the `book-new.component.ts` file:
  - Create a `model` signal holding the initial values for `isbn`, `title`, `subtitle`, `author` and
    `abstract`. **Never use `null`** as an initial value, use empty strings instead.
  - Create the form by calling the `form()` function (from `@angular/forms/signals`) with your model
    signal and an options object
  - Inside the options object, add a `submission.action` function. It receives the root field as a
    `FieldTree` - call it and read `.controlValue()` to get the current submitted value (this is
    the same value you'd get from `this.model()`) and log both to the console, then return
    `Promise.resolve(null)` (`null` tells Signal Forms "submission succeeded, no errors")
- Inside the `book-new.component.html` file:
  - Add a `<form>` tag and bind the created `form` to the `[formRoot]` directive - it automatically
    disables native browser validation, prevents the default submit behaviour and runs your
    `submission.action` for you, so you don't need to wire up a `(submit)` handler yourself
  - For each field of the model create one `<input>` tag and bind it with the `[formField]` directive,
    e.g. `[formField]="form.isbn"`
  - Also add a Submit-Button with `type="submit"`, disabled while `form().invalid()`

Run the application inside the Browser: You should see your form. After you filled it out and
clicked on the Submit-Button you should see the submitted data logged inside your Browser
Developer Console.

## Hints

```
ng generate component book/book-new
```

```ts
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

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

  protected readonly form = form(this.model, {
    submission: {
      action: formField => {
        console.log(formField().controlValue(), this.model());
        // No validation errors
        return Promise.resolve(null);
      }
    }
  });
}
```

```html
<form [formRoot]="form">
  <label class="form-field">
    <span>ISBN</span>
    <input [formField]="form.isbn" />
  </label>

  <!-- ... one label/input pair per field ... -->

  <button type="submit" [disabled]="form().invalid()">Save</button>
</form>
```
