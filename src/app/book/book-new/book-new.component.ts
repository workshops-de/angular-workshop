import { Component, inject } from '@angular/core';
import {
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
  author: FormControl<string>;
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
    author: ['', [Validators.required, validAuthorName()]],
    abstract: ['']
  });

  submit() {
    this.bookApiService
      .create(this.form.getRawValue())
      .subscribe();
  }
}
