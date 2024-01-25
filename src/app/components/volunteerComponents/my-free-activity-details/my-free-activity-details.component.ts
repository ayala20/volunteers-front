import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditFreeActivityFormComponent } from '../edit-free-activity-form/edit-free-activity-form.component';
import { SpinnerService } from 'src/app/services/spinner.service';

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

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public spinnerService: SpinnerService) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
    this.dataSource = this.freeActivities
  }

  onOpenDetails(freeActivity: any) {
    this.dialog.open(EditFreeActivityFormComponent, {
      data: {
        freeActivity: freeActivity
      },
    });
  }

}
