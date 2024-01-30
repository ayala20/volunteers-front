import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IAssociation } from 'src/app/models/association.interface';
import { FreeActivitiesInAssociationComponent } from '../free-activities-in-association/free-activities-in-association.component';
import { environment } from 'src/environment/environment';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AssociationService } from 'src/app/services/association.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  associations: Array<IAssociation> = [];
  url: string = environment.url;
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private associationService: AssociationService) {
    this.associations = this.route.snapshot.data['associations'];
  }

  openDialog(association: IAssociation) {
    this.dialog.open(FreeActivitiesInAssociationComponent, {
      data: {
        association
      },
      width: '100%',
      height: '90%',
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  private _filter(value: any): any[] {
    const filterValue = value;
    return this.associations.filter(association => association.name.includes(filterValue));
  }
}
