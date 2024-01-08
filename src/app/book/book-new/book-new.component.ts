import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-book-new',
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  form: FormGroup = this.formBuilder.group({
    isbn: [''],
    title: [''],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: ['']
  });

  submit() {
    console.log(this.form);
  }
}
