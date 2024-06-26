import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormSubmittedEvent,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BookApiService } from '../book-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, filter, finalize, tap } from 'rxjs';
import { validAuthorName } from '../../validators/author.validator';

interface BookForm {
  isbn: FormControl<string>;
  title: FormControl<string>;
  subtitle: FormControl<string>;
  author: FormControl<string>;
  abstract: FormControl<string>;
  cover: FormControl<string>;
}

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  // Injections
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly bookApiService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);

  // Template Binding
  private loading = signal(false);
  form: FormGroup<BookForm> = this.initForm();

  constructor() {
    this.form.events
      .pipe(filter(event => event instanceof FormSubmittedEvent))
      .subscribe(event => console.log(event));
  }

  submit() {
    this.loading.set(true);
    this.bookApiService
      .create(this.form.getRawValue())
      .pipe(
        catchError(() => {
          console.log('Es gab einen Fehler ');
          return EMPTY;
        }),
        tap(() => this.loading.set(false)),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private initForm() {
    return this.formBuilder.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      author: ['', [Validators.required, validAuthorName()]],
      abstract: [''],
      cover: ['']
    });
  }
}
