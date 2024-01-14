import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateOfBirthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const birthDate = new Date(control.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    if (birthDate > eighteenYearsAgo) {
      return { underEighteen: true };
    }
    return null;
  };
}
