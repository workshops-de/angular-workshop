# Add Form Validation

ca. 10 min

Let's add some Form Validation!

- Inside the `book-new.component.ts` file add a `required()` rule for `isbn`, `title` and `author`.
  Since `form()` was only called with a `model` and an `options` object so far (for
  `submission.action`), pass the schema callback as the *second* argument now and move the
  `options` object to the *third* argument: `form(this.model, schemaPath => {...}, {...})`
- Now we can add some template logic whenever a field has validation errors:
  - Add a `<small>` tag with `@if` beneath the `<input>` tags of the `isbn`, `title` and `author`
    fields
  - The condition for displaying the `<small>` tag should be based on the field having been
    `touched()` and currently having a `required` error. Use `getError('required')` instead of
    `errors().length` - it directly asks "does this field have *this* error?" instead of "does it
    have *any* error?", which reads better once a field can fail more than one validator:
    `form.<fieldName>().touched() && form.<fieldName>().getError('required')`
- Disable the `<button>` tag as long as the whole form is not in a valid state by using the
  `disabled` property: `[disabled]="form().invalid()"`

## Hints

```ts
protected readonly form = form(
  this.model,
  schemaPath => {
    required(schemaPath.isbn);
    required(schemaPath.title);
    required(schemaPath.author);
  },
  {
    submission: {
      action: formField => {
        console.log(formField().controlValue(), this.model());
        // No validation errors
        return Promise.resolve(null);
      }
    }
  }
);
```

```html
<label class="form-field">
  <span>Title</span>
  <input [formField]="form.title" />
  @if (form.title().touched() && form.title().getError('required')) {
    <small>Please insert a title.</small>
  }
</label>

<label class="form-field">
  <span>Author</span>
  <input [formField]="form.author" />
  @if (form.author().touched() && form.author().getError('required')) {
    <small>Please insert an Author.</small>
  }
</label>

<!-- ... -->

<button type="submit" [disabled]="form().invalid()">Save</button>
```

## Bonus

### Give each field a proper message

Instead of hardcoding the message in the template, pass a `message` to `required()`
(e.g. `required(schemaPath.title, {message: 'Please insert a title.'})`) and render
`form.title().getError('required')?.message` in the template so the message lives next to the
validator instead of being duplicated in the template.
