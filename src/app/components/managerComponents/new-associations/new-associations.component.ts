import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';
import { AssociationDetailsComponent } from '../association-details/association-details.component';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environment/environment';
import { AssociationService } from 'src/app/services/association.service';

@Component({
  selector: 'app-new-associations',
  templateUrl: './new-associations.component.html',
  styleUrls: ['./new-associations.component.scss'],
})
export class NewAssociationsComponent {
  associations: Array<IAssociation> = [];
  url: string = environment.url;

  constructor(private route: ActivatedRoute, 
    public dialog: MatDialog, 
    public spinnerService: SpinnerService,
    public associationService: AssociationService) {
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
