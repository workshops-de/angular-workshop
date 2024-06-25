import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { BookApiService } from '../book-api.service';
import { validAuthorName } from '../validators/author.validator';

interface BookForm {
  isbn: FormControl<string>;
  title: FormControl<string>;
  subtitle: FormControl<string>;
  authors: FormArray<FormControl<string>>;
  abstract: FormControl<string>;
}

@Component({
  selector: 'app-book-new',
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly bookApiService = inject(BookApiService);

  form: FormGroup<BookForm> = this.formBuilder.group({
    isbn: ['', [Validators.required]],
    title: ['', [Validators.required]],
    subtitle: [''],
    authors: this.formBuilder.array([
      ['', [Validators.required, validAuthorName()]]
    ]),
    abstract: ['']
  });

  submit() {
    this.bookApiService.create(this.form.getRawValue()).subscribe();
    // We need to handle the formArray now for authors separately
    // Unfortunately the backend doesn't handle multiple authors yet
    const firstAuthor = this.form.getRawValue().authors[0] || 'n/a';
    this.bookApiService
      .create({ ...this.form.getRawValue(), author: firstAuthor })
      .subscribe();
  }

  get authors(): FormArray {
    return this.form.controls.authors;
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  addAuthor() {
    this.authors.push(
      this.formBuilder.control('', [Validators.required, validAuthorName()])
    );
  }
}
