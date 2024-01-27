import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManagerService } from 'src/app/services/manager.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { LogInComponent } from '../log-in/log-in.component';

export interface DialogData {
  email: string,
}

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm: FormGroup;
  step: number = 1;
  hide1 = true;
  hide2 = true;
  seconds: number = 59;
  minutes: number = 4;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes == 0) {
          this.pauseTimer()
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private managerService: ManagerService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<LogInComponent>,
    private volunteerService: VolunteerService) {
    this.forgotPasswordForm = this.formBuilder.group({
      emailControl: new FormControl(this.data.email, [Validators.required, Validators.email]),
      signControl: new FormControl('', [Validators.required]),
      codeControl: new FormControl('', [Validators.required]),
      passwordControl1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordControl2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  checkAndSendCode() {
    debugger;
    if (!this.forgotPasswordForm.controls['emailControl'].valid || !this.forgotPasswordForm.controls['signControl'].valid) {
      return;
    }
    if (this.forgotPasswordForm.value.signControl == 'm') {
      this.managerService.isManagerExistsByEmail(this.forgotPasswordForm.value.emailControl)
        .subscribe(data => {
          if (data) {
            this.step = 2
            this.pauseTimer()
            this.startTimer()
            this.seconds = 59
            this.minutes = 4
          } else {
            this.openAlert("כתובת מייל זו לא מופיעה ברשימת אחראי עמותות!", "alert-danger");
          }
        })
    } else {
      this.volunteerService.isVolunteerExistsByEmail(this.forgotPasswordForm.value.emailControl)
        .subscribe(data => {
          if (data) {
            this.step = 2
            this.pauseTimer()
            this.startTimer()
            this.seconds = 59
            this.minutes = 4
          } else {
            this.openAlert("כתובת מייל זו לא מופיעה ברשימת המתנדבים!", "alert-danger");
          }
        })
    }
  }

  openAlert(content: string, nameClass: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: content,
        class: nameClass,
        link: '/logIn'
      }
    });
  }

  checkCode() {
    if (!this.forgotPasswordForm.controls['codeControl'].valid) return;
    this.managerService.isCodeGood(this.forgotPasswordForm.value.emailControl, this.forgotPasswordForm.value.codeControl)
      .subscribe(res => {
        if (res) {
          this.step = 3
        } else {
          this.openAlert("קוד לא טוב!", "alert-danger");
        }
      })
  }

  finish() {
    if (!this.forgotPasswordForm.controls['passwordControl1'].valid) return;
    if (!this.forgotPasswordForm.controls['passwordControl2'].valid) return;
    if (this.forgotPasswordForm.value.passwordControl1 != this.forgotPasswordForm.value.passwordControl2) {
      this.openAlert("אין תאום בין השדות!", "alert-danger");
      return;
    }
    let email = this.forgotPasswordForm.value.emailControl
    let pass = this.forgotPasswordForm.value.passwordControl1
    debugger;
    if (this.forgotPasswordForm.value.signControl == 'm') {
      this.managerService.updatePassword(email, pass)
        .subscribe(
          (data) => {
            this.dialogRef.close()
            this.openAlert("סיסמה עודכנה בהצלחה!", "alert-success");
          },
          (error) => {
            this.openAlert("התרחשה שגיאה כלשהיא!", "alert-danger");
          }
        )
    } else {
      this.volunteerService.updatePassword(email, pass)
        .subscribe(
          (data) => {
            this.dialogRef.close()
            this.openAlert("סיסמה עודכנה בהצלחה!", "alert-success");
          },
          (error) => {
            this.openAlert("התרחשה שגיאה כלשהיא!", "alert-danger");
          }
        )
    }

  }
}
