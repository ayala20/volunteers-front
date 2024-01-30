import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FeedbackDetailsComponent } from '../../sharedComponents/feedback-details/feedback-details.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-feedback-histories',
  templateUrl: './feedback-histories.component.html',
  styleUrls: ['./feedback-histories.component.scss']
})
export class FeedbackHistoriesComponent {

  feedbacks: Array<any> = []
  url: string = environment.url;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public spinnerService: SpinnerService
  ) {
    this.feedbacks = this.route.snapshot.data['feedbacks'];
    console.log(this.feedbacks);
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
