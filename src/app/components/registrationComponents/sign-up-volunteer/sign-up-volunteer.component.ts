import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IVolunteer, IVolunteerCreate } from 'src/app/models/volunteer.interface';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';
import { dateOfBirthFuturValidator, dateOfBirthValidator } from 'src/app/validators/dateOfBirthValidator';
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
        dateOfBirthFuturValidator(),
      ]),
      idNumberControl: new FormControl('', [
        Validators.required,
        idNumberValidator(),
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  signUp() {
    if (!this.signUpForm.valid) return;
    const newVolunteer: IVolunteerCreate = {
      full_name: this.signUpForm.value.fullNameControl,
      address: this.signUpForm.value.addressControl,
      phone: this.signUpForm.value.phoneControl,
      dateOfBirth: new Date(this.signUpForm.value.dateOfBirthControl),
      id_number: this.signUpForm.value.idNumberControl,
      password: this.signUpForm.value.passwordControl,
      email: this.signUpForm.value.emailControl,
    };
    this.volunteerService.createVolunteer(newVolunteer).subscribe((data) => {
      saveToLocalStorage('user', data);
      this.router.navigate(['/menu']);
    });
  }

}
