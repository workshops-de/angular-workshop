import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validAuthorName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || null;
    const hasNumeric = /[0-9]+/.test(value); // Check if value has numerics
    return hasNumeric ? { invalidAuthor: true } : null;
  };
}
