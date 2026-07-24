# [optional] Write a custom async validator for duplicate ISBNs

ca. 20 min

Two more things for the ISBN field: it should reject values that are too short, and it should
reject ISBNs that already exist in the backend. The second check can only be answered by asking
the backend, so it has to run asynchronously.

- Add a `minLength()` rule for `isbn` with a minimum length of `5`, right next to the existing
  `required()` rule
- Create a folder `validators` and add a file `isbn.validator.ts`
- Create a function called `uniqueIsbn()` that takes the `isbn` path *and* a `BookApiService`
  instance, and registers a `validateAsync()` rule on the path - no new method on
  `BookApiService` needed, reuse the existing `getByIsbn()`
  - `params` reads the field's current value
  - `factory` wraps the params signal in an `rxResource()` (from `@angular/core/rxjs-interop`),
    whose `stream` calls `bookApiService.getByIsbn(isbn)` directly - `rxResource()` works with
    Observables natively and manages the subscription for you, so there's no need to convert
    anything to a Promise
  - `onSuccess` runs when `getByIsbn()` resolves, i.e. a book with this ISBN was found - map that
    to a `{ kind: 'duplicateIsbn', ... }` error
  - `onError` runs when `getByIsbn()` rejects. A `404 Not Found` (`HttpErrorResponse` with
    `status === 404`) just means no book has this ISBN yet, so map that case to no error
    (`undefined`); map every other error to a `{ kind: 'checkFailed', ... }` error - `onError` is
    **required** by `validateAsync()`, it is not optional
- Call `uniqueIsbn(schemaPath.isbn, this.bookApiService)` inside the schema callback, right after
  `minLength()`. Async validation only runs once all synchronous validators on the field are
  passing, so it won't fire on an empty or too-short ISBN
- Extend the `@if` beneath the `<input>` tag for the ISBN to branch over `getError('minLength')`,
  the field's `pending()` state (while the async check is in flight), and
  `getError('duplicateIsbn')`, each with their own message

## Hints

```ts
// isbn.validator.ts
import { HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { SchemaPath, validateAsync } from '@angular/forms/signals';
import { BookApiService } from '../book-api.service';

export function uniqueIsbn(path: SchemaPath<string>, bookApiService: BookApiService): void {
  validateAsync(path, {
    params: ({ value }) => value(),
    factory: isbn =>
      rxResource({
        params: isbn,
        stream: ({ params: isbn }) => bookApiService.getByIsbn(isbn)
      }),
    // getByIsbn() resolving means a book with this ISBN was found - it's a duplicate
    onSuccess: () => ({ kind: 'duplicateIsbn', message: 'This ISBN already exists' }),
    // getByIsbn() rejecting with a 404 just means the ISBN is free - any other error is a real failure
    onError: error =>
      error instanceof HttpErrorResponse && error.status === 404
        ? undefined
        : { kind: 'checkFailed', message: 'Could not verify ISBN uniqueness' }
  });
}
```

```ts
// book-new.component.ts
protected readonly form = form(
  this.model,
  schemaPath => {
    required(schemaPath.isbn);
    minLength(schemaPath.isbn, 5);
    uniqueIsbn(schemaPath.isbn, this.bookApiService);
    required(schemaPath.title);
    required(schemaPath.author);
    validAuthorName(schemaPath.author);
  },
  {
    submission: {
      /* ... */
    }
  }
);
```

```html
<label class="form-field">
  <span>ISBN</span>
  <input [formField]="form.isbn" />
  @if (form.isbn().touched()) {
    @if (form.isbn().getError('required')) {
      <small>Please insert an Author.</small>
    } @else if (form.isbn().getError('minLength')) {
      <small>ISBN must be at least 5 characters long</small>
    } @else if (form.isbn().pending()) {
      <small>Checking ISBN…</small>
    } @else if (form.isbn().getError('duplicateIsbn')) {
      <small>This ISBN already exists</small>
    }
  }
</label>
```

## Bonus

### Build a second version with `validateHttp()`

`validateAsync()` + `rxResource()` is the general-purpose tool for async validation - it works
with any Observable-based source, not just HTTP calls. But since our check is a plain HTTP GET,
Signal Forms has a more specialized rule for exactly this case: `validateHttp()`. It builds and
manages its own `httpResource()` internally, so you don't even need to go through
`BookApiService` for this variant.

Build a second, parallel implementation next to `uniqueIsbn()` - e.g. `uniqueIsbnHttp()` in the
same `isbn.validator.ts` - that achieves the same result using `validateHttp()` instead:

- `request` returns the URL to check directly (`` `http://localhost:4730/books/${value()}` ``) -
  no `factory`/`rxResource()`/`BookApiService` needed, `validateHttp()` performs the GET itself
- `onSuccess` and `onError` behave exactly like in `uniqueIsbn()`: a successful response means the
  ISBN is taken, a `404` means it's free, anything else is a real check failure

Try building it yourself first - a finished `uniqueIsbnHttp()` is already sitting right below
`uniqueIsbn()` in `validators/isbn.validator.ts` (not wired into `BookNewComponent`, just kept
there side by side for comparison), so you can check your version against it, or just read
through it, whenever you like.

```ts
// isbn.validator.ts
import { HttpErrorResponse } from '@angular/common/http';
import { SchemaPath, validateHttp } from '@angular/forms/signals';

export function uniqueIsbnHttp(path: SchemaPath<string>): void {
  validateHttp(path, {
    request: ({ value }) => `http://localhost:4730/books/${value()}`,
    onSuccess: () => ({ kind: 'duplicateIsbn', message: 'This ISBN already exists' }),
    onError: error =>
      error instanceof HttpErrorResponse && error.status === 404
        ? undefined
        : { kind: 'checkFailed', message: 'Could not verify ISBN uniqueness' }
  });
}
```
