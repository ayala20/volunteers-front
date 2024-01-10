import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';
import { AssociationDetailsComponent } from '../../registrationComponents/association-details/association-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-associations',
  templateUrl: './new-associations.component.html',
  styleUrls: ['./new-associations.component.scss'],
})
export class NewAssociationsComponent {
  associations: Array<IAssociation> = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.associations = this.route.snapshot.data['associations'];
  }

  openDialog(association: IAssociation) {
    this.dialog.open(AssociationDetailsComponent, {
      data: {
        association
      },
    });
  }

}
