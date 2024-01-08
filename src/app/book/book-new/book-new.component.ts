import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BookApiService } from '../book-api.service';
import { take } from 'rxjs';
import { Book } from '../book';

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['']
  });

  constructor(private readonly formBuilder: FormBuilder, private readonly bookApiService: BookApiService) {
  }

  submit() {
    this.bookApiService.create(this.form.getRawValue()).pipe(take(1)).subscribe()
  }
}
