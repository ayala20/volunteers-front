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

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  color: ThemePalette = 'primary';
  signUser: string;
  emailOrIdNumber: string;
  signInForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public volunteerService: VolunteerService,
    public managerService: ManagerService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.signUser = 'v';
    this.emailOrIdNumber = 'מספר זהות';
    this.signInForm = this.formBuilder.group({
      idNumberControl: new FormControl('', [Validators.required]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  changeUser() {
    if (this.signUser === 'v') {
      this.signUser = 'm';
      this.emailOrIdNumber = 'דוא"ל';
    } else {
      this.signUser = 'v';
      this.emailOrIdNumber = 'מספר זהות';
    }
  }

  f() {
    this.router.navigate(['/signUpManager'], {
      state: { status: 'APPROVED' },
    });
  }

  signIn() {
    if (!this.signInForm.valid) return;
    if (this.signUser == 'v') {
      this.volunteerService
        .signIn(
          this.signInForm.value.idNumberControl,
          this.signInForm.value.passwordControl
        )
        .subscribe(
          (data) => {
            saveToLocalStorage('user', data);
            this.router.navigate(['/menu']);
          },
          (error) => {
            if (error.status == 404) {
              this.openAlert()
            }
          },)
    } else if (this.signUser == 'm') {
      this.managerService
        .signIn(
          this.signInForm.value.idNumberControl,
          this.signInForm.value.passwordControl
        )
        .subscribe(
          (data) => {
            debugger
            saveToLocalStorage('user', data);
            this.router.navigate(['/menu']);
          },
          (error) => {
            if (error.status == 404) {
              this.openAlert()
            }
          },
        );
    }
  }

  openAlert() {
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: `אינך קיים במערכת!` +
          "<br />" +
          "לחץ על הרשמה.",
        class: 'alert-danger',
        link: '/logIn'
      }
    });
  }
}
