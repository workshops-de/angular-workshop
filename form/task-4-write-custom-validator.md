# [optional] Write a custom validator for the Author field

ca. 15 min

- Create a folder `validators` and add a file `author.validator.ts`
- Create a function called `validAuthorName()` that registers a `validate()` rule on the path it
  is given: `export function validAuthorName(path: SchemaPath<string>): void { validate(path, ({value}) => {...}) }`
- Extract the value from the field with `value()` and check if there are any digits inside the
  given string. (Hint: you can use a Regex for this: `/[0-9]+/.test(value())`)
- If the value contains any digits, return a validation error:
  `{ kind: 'invalidAuthor', message: 'Der Name eines Autors darf keine Zahlen beinhalten' }`,
  otherwise return `undefined`
- Call your custom validator `validAuthorName(schemaPath.author)` right after `required()` inside
  the schema callback of the `BookNewComponent`
- Extend the `@if` beneath the `<input>` tag for the Author. It should be displayed as soon as the
  field is `touched()` and, depending on which error `kind` is present
  (`form.author().getError('invalidAuthor')`), show the matching message

## Hints

```ts
// author.validator.ts
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
```

```ts
// book-new.component.ts
protected readonly form = form(
  this.model,
  schemaPath => {
    required(schemaPath.isbn);
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
  <span>Author</span>
  <input [formField]="form.author" />
  @if (form.author().touched()) {
    @if (form.author().getError('required')) {
      <small>Please insert an Author.</small>
    } @else if (form.author().getError('invalidAuthor')) {
      <small>Name must not contain digits</small>
    }
  }
</label>
```
