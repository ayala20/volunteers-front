import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-volunteer-feedback',
  templateUrl: './volunteer-feedback.component.html',
  styleUrls: ['./volunteer-feedback.component.scss']
})
export class VolunteerFeedbackComponent {
  feedbacks: Array<any> = []

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    debugger
    this.feedbacks = this.route.snapshot.data['feedbacks'];
    debugger
    console.log(this.feedbacks);

  }

  convertISODateToRegularFormat(isoDate: any) {
    const dateObject = new Date(isoDate);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd');
  }
}
