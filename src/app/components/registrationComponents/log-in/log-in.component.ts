import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { idNumberValidator } from 'src/app/validators/idNumberValidator';
import { UserService } from 'src/app/services/user.service';
import { ForgotPasswordFormComponent } from '../forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  signUser: string;
  signInForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public volunteerService: VolunteerService,
    public managerService: ManagerService,
    private router: Router,
    public dialog: MatDialog,
    public userService: UserService
  ) {
    this.signUser = 'v';
    this.signInForm = this.formBuilder.group({
      idNumberControl: new FormControl('', [Validators.required, idNumberValidator()]),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  signIn() {
    if (!this.signInForm.controls['passwordControl'].valid) return;
    if (this.signUser == 'v' && !this.signInForm.controls['idNumberControl'].valid) return;
    if (this.signUser == 'm' && !this.signInForm.controls['emailControl'].valid) return;
    if (this.signUser == 'v') {
      this.volunteerService
        .signIn(
          this.signInForm.value.idNumberControl,
          this.signInForm.value.passwordControl
        )
        .subscribe(
          (data) => {
            saveToLocalStorage('user', data);
            this.userService.setUserConnect(true)
            this.router.navigate(['/menu']);
          },
          (error) => {
            this.openAlert(error.status)
          },)
    } else if (this.signUser == 'm') {
      this.managerService
        .signIn(
          this.signInForm.value.emailControl,
          this.signInForm.value.passwordControl
        )
        .subscribe(
          (data) => {
            saveToLocalStorage('user', data);
            this.userService.setUserConnect(true)
            this.router.navigate(['/menu']);
          },
          (error) => {
            this.openAlert(error.status)
          },
        );
    }
  }

  openAlert(statusNumber: number) {
    let content = ""
    if (statusNumber == 404) {
      content = `אינך קיים במערכת!` + "<br />" + "לחץ על הרשמה."
    }
    else if (statusNumber == 401) {
      content = `סיסמתך שגויה!` + "<br />" + "נסה שוב."
    }
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: content,
        class: 'alert-danger',
        link: '/logIn'
      }
    });
  }

  openForgotPasswordForm() {
    this.dialog.open(ForgotPasswordFormComponent, {
      data: {
        email: this.signInForm.value.emailControl,
      },
      width: '50%',
    });
  }
}
