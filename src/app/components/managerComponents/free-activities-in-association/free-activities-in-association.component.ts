import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../association-details/association-details.component';
import { StatusesComponent } from '../statuses/statuses.component';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';

@Component({
  selector: 'app-free-activities-in-association',
  templateUrl: './free-activities-in-association.component.html',
  styleUrls: ['./free-activities-in-association.component.scss']
})
export class FreeActivitiesInAssociationComponent {

  freeActivities: Array<IFreeActivity> = [];
  dataSource: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<StatusesComponent>,
    private freeActivityService: FreeActivityService,
  ) {
    this.findAllRequestByManagerAndStatus()
  }

  findAllRequestByManagerAndStatus() {
    this.freeActivityService.findAllFreeActivityByAssociation(this.data.association.id!)
    .subscribe(data => {
      this.freeActivities = data
      this.dataSource = this.freeActivities
    })
  }
}
