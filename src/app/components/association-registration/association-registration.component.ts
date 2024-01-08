import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';
import { AssociationService } from 'src/app/services/association.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';

@Component({
  selector: 'app-association-registration',
  templateUrl: './association-registration.component.html',
  styleUrls: ['./association-registration.component.scss'],
})
export class AssociationRegistrationComponent {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public associationService: AssociationService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      addressControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phoneControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      fileControl: new FormControl('', [Validators.required]),
      logoImageControl: new FormControl(''),
    });
  }

  csvInputChange(fileInputEvent: any) {
    debugger
    console.log(fileInputEvent.target.files[0]);
  }

  changeFile() {
    debugger
    let name = this.signUpForm.value.fileControl
    // console.log(fileInputEvent.target.files[0]);
  }

  changeImage() {
    debugger
    let name = this.signUpForm.value.fileControl
    // console.log(fileInputEvent.target.files[0]);
  }
  signUp() {
    if (!this.signUpForm.valid) return;
    const newAssociation: IAssociation = {
      name: this.signUpForm.value.nameControl,
      address: this.signUpForm.value.addressControl,
      email: this.signUpForm.value.emailControl,
      phone: this.signUpForm.value.phoneControl,
      file: this.signUpForm.value.fileControl,
      logo_image: this.signUpForm.value.logoImageControl,
    };
    this.associationService
      .createAssociation(newAssociation)
      .subscribe((data) => {
        saveToLocalStorage('user', data);
        this.router.navigate(['/menu']);
      });
  }


}
