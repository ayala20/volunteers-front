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
import { getFromLocalStorage, saveToLocalStorage } from 'src/app/shared/storageUtils';
import { AssociationRegistrationComponent } from '../association-registration/association-registration.component';
import { UserService } from 'src/app/services/user.service';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-edit-manager-from',
  templateUrl: './edit-manager-from.component.html',
  styleUrls: ['./edit-manager-from.component.scss']
})
export class EditManagerFromComponent {
  signUpForm: FormGroup;
  associations: Array<IAssociation> = [];
  hide = true;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    public managerService: ManagerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public userService: UserService
  ) {
    this.user = getFromLocalStorage("user")
    console.log(this.user);
    
    this.signUpForm = this.formBuilder.group({
      phoneControl: new FormControl(this.user.phone, [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      emailControl: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  signUp() {
    if (!this.signUpForm.valid) return;
    const newManagerUpdate: any = {
      phone: this.signUpForm.value.phoneControl,
      email: this.signUpForm.value.emailControl,
    };
    this.managerService.updateManager(this.user.id, newManagerUpdate).subscribe(
      (data: IManager) => {
        saveToLocalStorage('user', data);
        this.userService.setUserConnect(true);
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: "העדכון התבצע בהצלחה!",
            class: 'alert-success',
          }
        });
        this.router.navigate(['/menu']);
      },
      (error) => {
        this.openAlert(error.status)
      },
    );
  }

  openAlert(statusNumber: number) {
    let content = ""
    if (statusNumber == 409) {
      content = `אחד או יותר מהפרטים שהזנת קיימים אצלנו במערכת!` + "<br />" + "נסה שוב ליצור משתמש או נסה להתחבר."
    }
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: content,
        class: 'alert-danger',
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AssociationRegistrationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
