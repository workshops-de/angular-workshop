import { HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { SchemaPath, validateAsync, validateHttp } from '@angular/forms/signals';
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

/**
 * Bonus: the same check as uniqueIsbn(), but built with validateHttp() instead of
 * validateAsync() + rxResource(). validateHttp() manages its own httpResource() internally, so
 * it doesn't need a BookApiService - it just needs the URL to GET.
 *
 * Not wired up in BookNewComponent - kept here side by side with uniqueIsbn() for comparison.
 */
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
