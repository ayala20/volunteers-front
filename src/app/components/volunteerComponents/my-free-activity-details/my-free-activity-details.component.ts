import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { EditFreeActivityFormComponent } from '../edit-free-activity-form/edit-free-activity-form.component';

export interface PeriodicElement {
  category: string;
  association: string;
  status: string;
  details: string;
}


@Component({
  selector: 'app-my-free-activity-details',
  templateUrl: './my-free-activity-details.component.html',
  styleUrls: ['./my-free-activity-details.component.scss']
})
export class MyFreeActivityDetailsComponent {

  freeActivities: Array<any> = []
  dataSource: any[] = [];

  displayedColumns: string[] = ['קטגוריה', 'עמותה', 'סטטוס'];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
    this.dataSource = this.freeActivities
  }

  getFreeActivities() {

  }

  onOpenDetails(freeActivity: any) {
    this.dialog.open(EditFreeActivityFormComponent, {
      data: {
        freeActivity: freeActivity
      },
    });
  }

}
