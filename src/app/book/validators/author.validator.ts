import { SchemaPath, validate } from '@angular/forms/signals';

export function validAuthorName(path: SchemaPath<string>): void {
  validate(path, ({ value }) => {
    const authorName = value();
    if (!authorName) {
      return undefined;
    }

    const hasNumeric = /[0-9]+/.test(authorName);
    return hasNumeric
      ? { kind: 'invalidAuthor', message: 'Der Name eines Autors darf keine Zahlen beinhalten' }
      : undefined;
  });
}
