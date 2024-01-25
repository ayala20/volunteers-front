import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IVolunteer } from 'src/app/models/volunteer.interface';
import { VolunteerDetailsComponent } from '../volunteer-details/volunteer-details.component';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-reports-of-volunteers',
  templateUrl: './reports-of-volunteers.component.html',
  styleUrls: ['./reports-of-volunteers.component.scss']
})
export class ReportsOfVolunteersComponent implements OnInit {
  volunteers: Array<any> = []
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {
    this.volunteers = this.route.snapshot.data['volunteers'];
  }

  openDialog(volunteer: IVolunteer) {
    this.dialog.open(VolunteerDetailsComponent, {
      data: {
        volunteer
      },
      width: '100%',
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
    return this.volunteers.filter(volunteer => volunteer.full_name.includes(filterValue));
  }
}
