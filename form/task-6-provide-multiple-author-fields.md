# [optional] Provide multiple author fields

ca. 20 min

1. Change the `author` field in your `model` signal to an `authors: string[]` array (start with a
   single empty entry: `authors: ['']`)
2. Replace the `required()`/`validAuthorName()` rules on `schemaPath.author` with `applyEach()` on
   `schemaPath.authors`, applying both rules to every item
3. Create an `addAuthor()` and a `deleteAuthor(index: number)` method that update the `authors`
   array on the `model` signal (there is no `FormArray` API anymore - you just update the plain
   array in the model)
4. Insert the new author fields inside the template using `@for` for iterating over `form.authors`
5. Add Buttons for removing and adding an Author (the Button for removing an Author needs to be
   inside the Html created with `@for`)
6. Our Backend cannot handle multiple authors - In order for the `BookApiService` to still work we
   need to just give in one single Author of this Array (do this inside your `submission.action`,
   right before calling `create()`)

## Hints

```ts
protected readonly model = signal({
  isbn: '',
  title: '',
  subtitle: '',
  authors: [''],
  abstract: ''
});

protected readonly form = form(
  this.model,
  schemaPath => {
    required(schemaPath.isbn);
    required(schemaPath.title);
    applyEach(schemaPath.authors, author => {
      required(author);
      validAuthorName(author);
    });
  },
  {
    submission: {
      action: async () => {
        // We need to handle the authors array now separately
        // Unfortunately the backend doesn't handle multiple authors yet
        const firstAuthor = this.model().authors[0] || 'n/a';
        await firstValueFrom(
          this.bookApiService.create({ ...this.model(), author: firstAuthor })
        );
        return null;
      }
    }
  }
);

addAuthor() {
  this.model.update(m => ({ ...m, authors: [...m.authors, ''] }));
}

deleteAuthor(authorIndex: number) {
  this.model.update(m => ({
    ...m,
    authors: m.authors.filter((_, index) => index !== authorIndex)
  }));
}
```

```html
@for (author of form.authors; track $index; let authorIndex = $index) {
  <label class="form-field">
    <span>Author</span>
    <input [formField]="author" />
    <!-- <small> .... </small>-->
  </label>
  <button type="button" (click)="deleteAuthor(authorIndex)">Remove Author</button>
}
<button type="button" (click)="addAuthor()">Author hinzufügen</button>
```
