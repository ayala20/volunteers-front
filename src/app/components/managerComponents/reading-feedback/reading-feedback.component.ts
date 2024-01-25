import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reading-feedback',
  templateUrl: './reading-feedback.component.html',
  styleUrls: ['./reading-feedback.component.scss']
})
export class ReadingFeedbackComponent {
  feedbacks: Array<any> = []

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.feedbacks = this.route.snapshot.data['feedbacks'];
  }

  convertISODateToRegularFormat(isoDate: any) {
    const dateObject = new Date(isoDate);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd');
  }
}
