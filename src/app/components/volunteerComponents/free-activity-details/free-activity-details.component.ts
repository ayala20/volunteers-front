import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { RequestComponent } from '../request/request.component';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';

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
    private dialogRef: MatDialogRef<RequestComponent>,) {
      debugger
      console.log(data.freeActivity);
      
    }

  onWant() {
    debugger
    // this.associationService.updateStatus(this.data.association.id!, "APPROVED").subscribe(data => {
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
    // })
  }
}
