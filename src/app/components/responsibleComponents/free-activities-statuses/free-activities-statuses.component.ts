import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-free-activities-statuses',
  templateUrl: './free-activities-statuses.component.html',
  styleUrls: ['./free-activities-statuses.component.scss']
})
export class FreeActivitiesStatusesComponent {

  freeActivities: Array<any> = []
  dataSource: any[] = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
    this.dataSource = this.freeActivities
  }

}
