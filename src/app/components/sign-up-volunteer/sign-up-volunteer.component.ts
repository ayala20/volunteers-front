import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IVolunteer } from 'src/app/models/volunteer.interface';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';
import { dateOfBirthValidator } from 'src/app/validators/dateOfBirthValidator';
import { idNumberValidator } from 'src/app/validators/idNumberValidator';

@Component({
  selector: 'app-sign-up-volunteer',
  templateUrl: './sign-up-volunteer.component.html',
  styleUrls: ['./sign-up-volunteer.component.scss'],
})
export class SignUpVolunteerComponent {
  signUpForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public volunteerService: VolunteerService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      fullNameControl: new FormControl('', [Validators.required]),
      addressControl: new FormControl('', [Validators.required]),
      phoneControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      dateOfBirthControl: new FormControl('', [
        Validators.required,
        dateOfBirthValidator(),
      ]),
      idNumberControl: new FormControl('', [
        Validators.required,
        idNumberValidator(),
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUp() {
    if (!this.signUpForm.valid) return;
    const newVolunteer: IVolunteer = {
      full_name: this.signUpForm.value.fullNameControl,
      address: this.signUpForm.value.addressControl,
      phone: this.signUpForm.value.phoneControl,
      dateOfBirth: new Date(this.signUpForm.value.dateOfBirthControl),
      id_number: this.signUpForm.value.idNumberControl,
      password: this.signUpForm.value.passwordControl,
    };
    this.volunteerService.createVolunteer(newVolunteer).subscribe((data) => {
      saveToLocalStorage('user', data);
      this.router.navigate(['/menu']);
    });
  }

  isAgeBelow18(): boolean {
    const dateOfBirth = this.signUpForm.get('dateOfBirthControl')?.value;

    // בדיקה שהתאריך לידה הוא לפני 18 שנה מהיום הנוכחי
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      return true;
    }

    return false;
  }
}