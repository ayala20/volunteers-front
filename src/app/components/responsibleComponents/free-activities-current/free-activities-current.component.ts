import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-free-activities-current',
  templateUrl: './free-activities-current.component.html',
  styleUrls: ['./free-activities-current.component.scss']
})
export class FreeActivitiesCurrentComponent {

  freeActivities: Array<any> = []
  dataSource: any[] = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
    this.dataSource = this.freeActivities
  }
}
