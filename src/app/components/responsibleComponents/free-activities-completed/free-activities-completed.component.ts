import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-free-activities-completed',
  templateUrl: './free-activities-completed.component.html',
  styleUrls: ['./free-activities-completed.component.scss']
})
export class FreeActivitiesCompletedComponent {

  freeActivities: Array<any> = []
  dataSource: any[] = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
    this.dataSource = this.freeActivities
  }
}
