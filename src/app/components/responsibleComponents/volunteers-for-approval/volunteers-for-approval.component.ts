import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { FreeActivityWithvolunteerDetailsComponent } from '../free-activity-withvolunteer-details/free-activity-withvolunteer-details.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-volunteers-for-approval',
  templateUrl: './volunteers-for-approval.component.html',
  styleUrls: ['./volunteers-for-approval.component.scss']
})
export class VolunteersForApprovalComponent {

  freeActivities: Array<IFreeActivity> = []

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
    console.log(this.freeActivities);
  }

  openDialog(freeActivity: IFreeActivity) {    
    this.dialog.open(FreeActivityWithvolunteerDetailsComponent, {
      data: {
        freeActivity
      },
    });
  }
}
