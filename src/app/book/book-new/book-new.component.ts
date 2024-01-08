import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: ['']
  });

  constructor(private readonly formBuilder: FormBuilder) {
  }

  submit() {
    console.log(this.form);
  }
}
