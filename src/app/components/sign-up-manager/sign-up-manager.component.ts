import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';
import { IManager } from 'src/app/models/manager.interface';
import { ManagerService } from 'src/app/services/manager.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';
import { AssociationRegistrationComponent } from '../association-registration/association-registration.component';

@Component({
  selector: 'app-sign-up-manager',
  templateUrl: './sign-up-manager.component.html',
  styleUrls: ['./sign-up-manager.component.scss'],
})
export class SignUpManagerComponent {
  signUpForm: FormGroup;
  associations: Array<IAssociation> = [];

  constructor(
    private formBuilder: FormBuilder,
    public managerService: ManagerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.associations = this.route.snapshot.data['associations'];
    this.signUpForm = this.formBuilder.group({
      fullNameControl: new FormControl('', [Validators.required]),
      phoneControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      associationControl: new FormControl('', [Validators.required]),
      passwordAssociationControl: new FormControl('', [Validators.required]),
    });
  }

  signUp() {
    if (!this.signUpForm.valid) return;
    const newManager: IManager = {
      name: this.signUpForm.value.fullNameControl,
      phone: this.signUpForm.value.phoneControl,
      email: this.signUpForm.value.emailControl,
      password: this.signUpForm.value.passwordControl,
      association: this.signUpForm.value.associationControl,
    };
    this.managerService.createManager(newManager).subscribe((data) => {
      saveToLocalStorage('user', data);
      this.router.navigate(['/menu']);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AssociationRegistrationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
