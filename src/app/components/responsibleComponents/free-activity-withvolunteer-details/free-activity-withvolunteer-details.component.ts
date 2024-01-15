import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { VolunteersForApprovalComponent } from '../volunteers-for-approval/volunteers-for-approval.component';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';

export interface DialogData {
  freeActivity: IFreeActivity
}

@Component({
  selector: 'app-free-activity-withvolunteer-details',
  templateUrl: './free-activity-withvolunteer-details.component.html',
  styleUrls: ['./free-activity-withvolunteer-details.component.scss']
})
export class FreeActivityWithvolunteerDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  private freeActivityService: FreeActivityService,
  private dialogRef: MatDialogRef<VolunteersForApprovalComponent>,
  public dialog: MatDialog) {}

  getAgeFromDateOfBirth() {
    const start = new Date();
    const end = new Date(this.data.freeActivity.volunteer?.dateOfBirth!);
    const ageDiffMs = Math.abs(end.getTime() - start.getTime());
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  onApproved() {
    this.freeActivityService.updateStatus(this.data.freeActivity.freeActivity_id!, "1", "TAKEN").subscribe(data => {
      this.dialogRef.close()
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: `אישרת בהצלחה למתנדב ${this.data.freeActivity.volunteer?.full_name} את ביצוע ההתנדבות ${this.data.freeActivity.name}!` +
            "<br />" +
            "הודעה על כך יקבל המתנדב במייל ובאתר.",
          class: 'alert-success',
          link: '/menu'
        }
      });
    })
  }

  onCancel() {
    this.freeActivityService.updateStatus(this.data.freeActivity.freeActivity_id!, "1", "WAITING").subscribe(data => {
      this.dialogRef.close()
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: `המתנדב ${this.data.freeActivity.volunteer?.full_name} לא מורשה לבצע את ההתנדבות!` +
            "<br />" +
            "הודעה על כך יקבל המתנדב במייל.",
          class: 'alert-success',
          link: '/menu'
        }
      });
    })
  }
  
}
