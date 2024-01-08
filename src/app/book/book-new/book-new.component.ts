import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent {
  form = this.formBuilder.group({
    title: [''],
    subtitle: [''],
    author: [''],
    abstract: ['']
  });

  constructor(private readonly formBuilder: FormBuilder) {
  }

  submit() {
    console.log(this.form);
  }
}
