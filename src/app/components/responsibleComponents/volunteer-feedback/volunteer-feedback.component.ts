import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment/environment';
import { FeedbackDetailsComponent } from '../../sharedComponents/feedback-details/feedback-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-volunteer-feedback',
  templateUrl: './volunteer-feedback.component.html',
  styleUrls: ['./volunteer-feedback.component.scss']
})
export class VolunteerFeedbackComponent {
  feedbacks: Array<any> = []
  url: string = environment.url;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.feedbacks = this.route.snapshot.data['feedbacks'];
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
}
