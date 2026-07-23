# Extend BookApiService

ca. 15 min

In order to send the book to our Backend we need to extend our BookApiService for another
Request.

- Extend the `BookApiService` with a `create` method
- The method `create` should take a book (`Partial<Book>`) as a parameter and send it with a POST
  request.
- Inject the service inside of the `BookNewComponent`
- Extract the form data (you can just read the current model value with `this.model()`, since a
  Signal Forms model is always a plain, up-to-date object - no `getRawValue()` needed)
- Replace the `console.log` inside your `submission.action` with a call to the `create` method of
  the `BookApiService`. Since `action` must return a `Promise`, but `create()` returns an
  `Observable`, convert it with `firstValueFrom` from `rxjs`

## Hints

```ts
// book-api.service.ts
create(book: Partial<Book>): Observable<Book> {
  return this.http.post<Book>('http://localhost:4730/books', book);
}
```

```ts
// book-new.component.ts
private readonly bookApiService = inject(BookApiService);
...
protected readonly form = form(
  this.model,
  schemaPath => {
    ...
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
```

## Bonus

Redirect after book creation to the new created book
