import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';

@Component({
  selector: 'app-volunteers-for-approval',
  templateUrl: './volunteers-for-approval.component.html',
  styleUrls: ['./volunteers-for-approval.component.scss']
})
export class VolunteersForApprovalComponent {

  freeActivities: Array<IFreeActivity> = []

  constructor(private route: ActivatedRoute) {
    this.freeActivities = this.route.snapshot.data['freeActivities'];
  }
}
