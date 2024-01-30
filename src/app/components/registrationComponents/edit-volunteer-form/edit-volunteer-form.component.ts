import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IVolunteer, IVolunteerCreate } from 'src/app/models/volunteer.interface';
import { UserService } from 'src/app/services/user.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { getFromLocalStorage, saveToLocalStorage } from 'src/app/shared/storageUtils';
import { dateOfBirthFuturValidator, dateOfBirthValidator } from 'src/app/validators/dateOfBirthValidator';
import { idNumberValidator } from 'src/app/validators/idNumberValidator';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-volunteer-form',
  templateUrl: './edit-volunteer-form.component.html',
  styleUrls: ['./edit-volunteer-form.component.scss']
})
export class EditVolunteerFormComponent {
  updateForm: FormGroup;
  hide = true;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    public volunteerService: VolunteerService,
    private router: Router,
    public userService: UserService,
    public dialog: MatDialog,
  ) {
    this.user = getFromLocalStorage("user")
    console.log(this.user);
    console.log(this.user.dateOfBirth);

    this.updateForm = this.formBuilder.group({
      addressControl: new FormControl(this.user.address, [Validators.required]),
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

  getAgeFromDateOfBirth() {
    const start = new Date();
    const end = new Date(this.user.dateOfBirth);
    const ageDiffMs = Math.abs(end.getTime() - start.getTime());
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  updateVolunteer() {
    if (!this.updateForm.valid) return;
    const newVolunteerUpdate: any = {
      address: this.updateForm.value.addressControl,
      phone: this.updateForm.value.phoneControl,
      email: this.updateForm.value.emailControl,
    };
    this.volunteerService.updateVolunteer(this.user.id, newVolunteerUpdate)
      .subscribe(
        (data) => {
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
      content = `אחד או יותר מהפרטים שהזנת קיימים אצלנו במערכת!` + "<br />" + "הזן נתונים טובים."
    }
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: content,
        class: 'alert-danger',
      }
    });
  }
}
