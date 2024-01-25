import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { MyFreeActivityDetailsComponent } from '../my-free-activity-details/my-free-activity-details.component';
import { DatePipe } from '@angular/common';

export interface DialogData {
  freeActivity: IFreeActivity
}

@Component({
  selector: 'app-edit-free-activity-form',
  templateUrl: './edit-free-activity-form.component.html',
  styleUrls: ['./edit-free-activity-form.component.scss']
})
export class EditFreeActivityFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private freeActivityService: FreeActivityService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<MyFreeActivityDetailsComponent>,
    private router: Router) { }

  convertISODateToRegularFormat(isoDate: any) {
    const dateObject = new Date(isoDate);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd HH:mm');
  }

  onEnd() {
    this.freeActivityService.updateStatus(this.data.freeActivity.freeActivity_id!, '1', 'DONE')
      .subscribe(data => {
        this.dialogRef.close()
        this.router.navigate(['/feedbackForm', { id: this.data.freeActivity.freeActivity_id! }]);
      })
  }
}
