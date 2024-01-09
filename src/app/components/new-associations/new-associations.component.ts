import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';

@Component({
  selector: 'app-new-associations',
  templateUrl: './new-associations.component.html',
  styleUrls: ['./new-associations.component.scss'],
})
export class NewAssociationsComponent {
  associations: Array<IAssociation> = [];

  constructor(private route: ActivatedRoute) {
    this.associations = this.route.snapshot.data['associations'];
  }
}
