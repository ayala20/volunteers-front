import { AbstractControl, ValidatorFn } from '@angular/forms';

export function idNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const id = control.value;
    let total = 0;

    for (let i = 0; i < id.length; i++) {
      let currentNum = id[i];
      if (i % 2 == 1) {
        currentNum *= 2;
      }
      if (currentNum >= 10) {
        let numst = currentNum.toString();
        currentNum = Number(numst[0]) + Number(numst[1]);
      }
      total += Number(currentNum);
    }

    if (total % 10 != 0 || id.length != 9) {
      return { underEighteen: true };
    }

    return null;
  };
}
