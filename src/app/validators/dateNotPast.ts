import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateNotPast(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const dateValue = new Date(control.value);
    const currentDate = new Date();
    if (dateValue < currentDate) {
      return { past: true };
    }
    return null;
  };
}
