import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagerService } from 'src/app/services/manager.service';
import { VolunteerService } from 'src/app/services/volunteer.service';

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

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private managerService: ManagerService,
    private volunteerService: VolunteerService) {
    this.forgotPasswordForm = this.formBuilder.group({
      emailControl: new FormControl(this.data.email, [Validators.required, Validators.email]),
      signControl: new FormControl('', [Validators.required]),
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
            console.log("אפשר להמשיך");
          } else {
            console.log("הודעה על כך שהמשתמש לא קיים");
          }
        })
    } else {
      this.volunteerService.isVolunteerExistsByEmail(this.forgotPasswordForm.value.emailControl)
        .subscribe(data => {
          if (data) {
            console.log("אפשר להמשיך");
          } else {
            console.log("הודעה על כך שהמשתמש לא קיים");
          }
        })
    }
  }
}
