# Integrate the form for an edit page

ca. 25 min

We already have a form for creating a new book. Now let's reuse everything we've learned to build
an edit page for an existing one.

- Create a new Component `BookEditComponent` for the Book-Feature with
  `ng generate component book/book-edit`
- Configure a new Route inside `book.routes.ts`, displaying the `BookEditComponent`
  (path: `edit/:isbn`)
- Add a link from `BookDetailComponent` with `routerLink` to the edit route for the currently
  displayed book (`['/books/edit', book.isbn]`)
- Extend the `BookApiService` with an `update` method that sends a `PUT` request to
  `${this.baseUrl}/books/${isbn}`
- Inside `book-edit.component.ts`:
  - Read the `isbn` route param the same way `BookDetailComponent` does:
    `isbn = input.required<string>()` (works thanks to `withComponentInputBinding()`, already
    configured in `app.config.ts`)
  - Load the book with an `rxResource()`, using `this.isbn` as `params` and
    `bookApiService.getByIsbn(isbn)` as `stream`
  - Create the `model` with `linkedSignal()` instead of a plain `signal()`, deriving it from
    `bookResource.value()` - the Angular docs are explicit that copying a value from one signal
    into another with an `effect()` is an anti-pattern ("a sign you should move your
    source-of-truth higher up and use `computed()` or `linkedSignal()` instead"). `linkedSignal()`
    is exactly the writable-but-derived signal we need here: it resets to the freshly loaded book
    whenever `bookResource` resolves, but the form is still free to write to it afterward as the
    user edits the fields
  - Build the initial/fallback value with object spreading instead of a `??` per field: define a
    module-level `emptyBookForm` constant with empty strings for every form field, then compute
    the model as `{ ...emptyBookForm, ...this.bookResource.value() }`. Spreading `undefined`
    (while the book hasn't loaded yet) simply contributes no properties, so `emptyBookForm`'s
    defaults win; once the book arrives, its properties override them. As a side effect this also
    carries the loaded book's `cover` field through into the update payload, instead of silently
    dropping it - worth keeping in mind, since a bare `PUT` typically replaces the whole resource
  - Build the `form` the same way as in `BookNewComponent`: `required()` on `title` and `author`,
    `validAuthorName()` on `author` - but call `readonly()` on `isbn` instead of any validators,
    since the ISBN is the book's identifier and shouldn't be editable. `[formField]` picks up the
    `readonly` state automatically and marks the native input as `readonly`
  - The `submission.action` should call `bookApiService.update(this.isbn(), this.model())`
    (wrapped in `firstValueFrom`, just like `create()` in `BookNewComponent`)
- Copy `book-new.component.html`/`.scss` as a starting point for the template - drop the
  authors-array/`@for` part and go back to a single Author field, and drop the ISBN error `@if`
  since there's nothing to validate there anymore

## Hints

```ts
// book-api.service.ts
update(isbn: string, book: Partial<Book>): Observable<Book> {
  return this.http.put<Book>(`${this.baseUrl}/books/${isbn}`, book);
}
```

```ts
// book-edit.component.ts
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
```

```html
<!-- book-detail.component.html -->
<a [routerLink]="['/books/edit', book.isbn]">Edit</a>
```

## Bonus

- Show a loading indicator (`@if (bookResource.isLoading()) { ... }`) while the book is being
  fetched
- Redirect back to the book's detail page after a successful update
- Add a `canDeactivate` guard (like `BookDetailComponent` already has) to warn about unsaved
  changes when leaving the edit page
