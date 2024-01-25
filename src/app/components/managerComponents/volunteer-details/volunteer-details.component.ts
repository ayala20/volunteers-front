import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolunteer } from 'src/app/models/volunteer.interface';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { ReportsOfVolunteersComponent } from '../reports-of-volunteers/reports-of-volunteers.component';
import { Router } from '@angular/router';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { SpinnerService } from 'src/app/services/spinner.service';

export interface DialogData {
  volunteer: IVolunteer
}

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent {

  freeActivities: IFreeActivity[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private freeActivityService: FreeActivityService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<ReportsOfVolunteersComponent>,
    private router: Router,
    public spinnerService: SpinnerService) {
    this.findAllFreeActivity()
  }

  findAllFreeActivity() {
    const volunteerId = this.data.volunteer.id!
    this.freeActivityService.findAllFreeActivityByVolunteerAndStatus(volunteerId, ['TAKEN', 'DONE', 'REQUEST'])
      .subscribe(data => {
        this.freeActivities = data
      })
  }

}
