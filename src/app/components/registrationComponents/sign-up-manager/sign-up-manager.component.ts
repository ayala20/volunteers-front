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
import { IManager, IManagerCreate } from 'src/app/models/manager.interface';
import { ManagerService } from 'src/app/services/manager.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';
import { AssociationRegistrationComponent } from '../association-registration/association-registration.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up-manager',
  templateUrl: './sign-up-manager.component.html',
  styleUrls: ['./sign-up-manager.component.scss'],
})
export class SignUpManagerComponent {
  signUpForm: FormGroup;
  associations: Array<IAssociation> = [];
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public managerService: ManagerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public userService: UserService
  ) {
    this.associations = this.route.snapshot.data['associations'];
    this.signUpForm = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
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
    const newManager: IManagerCreate = {
      name: this.signUpForm.value.nameControl,
      phone: this.signUpForm.value.phoneControl,
      email: this.signUpForm.value.emailControl,
      password: this.signUpForm.value.passwordControl,
      association: this.signUpForm.value.associationControl,
      passwordAssociation: this.signUpForm.value.passwordAssociationControl
    };
    this.managerService.createManager(newManager).subscribe((data: IManager) => {
      saveToLocalStorage('user', data);
      this.userService.setUserConnect(true)
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
