import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { RequestComponent } from '../request/request.component';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { DatePipe } from '@angular/common';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';

export interface DialogData {
  freeActivity: IFreeActivity
}

@Component({
  selector: 'app-free-activity-details',
  templateUrl: './free-activity-details.component.html',
  styleUrls: ['./free-activity-details.component.scss']
})
export class FreeActivityDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RequestComponent>,
    private datePipe: DatePipe,
    private freeActivityService: FreeActivityService) {}

  convertISODateToRegularFormat(isoDate: any) {
    const dateObject = new Date(isoDate);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd HH:mm');
  }

  onWant() {
    const userId = getFromLocalStorage("user").id!
    this.freeActivityService.updateStatus(this.data.freeActivity.freeActivity_id!, userId, "REQUEST").subscribe(data => {
      this.dialogRef.close()
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: `בקשתך להתנדבות ${this.data.freeActivity.name} התקבלה בהצלחה!` +
            "<br />" +
            "בקשתך נשלחה ברגע זה לאראי ההתנדבות," +
            "<br />" +
            "תשובתו של האחראי תישלח אליך בבוא העת, הישתדל להיכנס למערכת ולהתעדכן בתשובה." +
            "<br />" +
            "אנו מודים לך שאתה מקדיש מזמנך ורוצה להתנדב ומעריכים מאוד.",
          class: 'alert-success',
          link: '/menu'
        }
      });
    })
  }
}
