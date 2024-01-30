import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FeedbackDetailsComponent } from '../../sharedComponents/feedback-details/feedback-details.component';
import { environment } from 'src/environment/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-reading-feedback',
  templateUrl: './reading-feedback.component.html',
  styleUrls: ['./reading-feedback.component.scss']
})
export class ReadingFeedbackComponent {
  feedbacks: Array<any> = []
  url: string = environment.url;

  filteredOptions: any[];
  filterForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
  ) {
    this.feedbacks = this.route.snapshot.data['feedbacks'];
    console.log(this.feedbacks);
    this.filterForm = this.formBuilder.group({
      myControlAssociation: new FormControl(''),
      myControlVolunteer: new FormControl(''),
    });
  }

  convertISODateToRegularFormat(isoDate: any) {
    const dateObject = new Date(isoDate);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd');
  }

  openDialog(feedback: any) {
    this.dialog.open(FeedbackDetailsComponent, {
      data: {
        feedback
      },
      width: '100%',
    });
  }

  filter() {
    let value1 = this.filterForm.value.myControlVolunteer;
    let value2 = this.filterForm.value.myControlAssociation;
    this.filteredOptions = this._filterAV(value1, value2)
  }

  ngOnInit() {
    let value1 = this.filterForm.value.myControlVolunteer;
    let value2 = this.filterForm.value.myControlAssociation;
    this.filteredOptions = this._filterAV(value1, value2)
  }

  private _filterAV(value1: any, value2: any): any[] {
    return this.feedbacks
      .filter(feedback =>
        feedback.volunteer.full_name.includes(value1) &&
        feedback.association.name.includes(value2)
      );
  }
}
