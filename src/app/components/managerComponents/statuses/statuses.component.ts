import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';
import { FreeActivitiesInAssociationComponent } from '../free-activities-in-association/free-activities-in-association.component';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent {
  associations: Array<IAssociation> = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.associations = this.route.snapshot.data['associations'];
  }

  openDialog(association: IAssociation) {
    this.dialog.open(FreeActivitiesInAssociationComponent, {
      data: {
        association
      },
      width: '100%',
    });
  }
}
