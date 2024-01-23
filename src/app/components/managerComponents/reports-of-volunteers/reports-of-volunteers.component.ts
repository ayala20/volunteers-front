import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IVolunteer } from 'src/app/models/volunteer.interface';
import { VolunteerDetailsComponent } from '../volunteer-details/volunteer-details.component';

@Component({
  selector: 'app-reports-of-volunteers',
  templateUrl: './reports-of-volunteers.component.html',
  styleUrls: ['./reports-of-volunteers.component.scss']
})
export class ReportsOfVolunteersComponent {
  volunteers: Array<any> = []

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
}
