import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFeedBack } from 'src/app/models/feedback.interface';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-feedback-histories',
  templateUrl: './feedback-histories.component.html',
  styleUrls: ['./feedback-histories.component.scss']
})
export class FeedbackHistoriesComponent {

  feedbacks: Array<any> = []

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public spinnerService: SpinnerService
  ) {
    debugger
    this.feedbacks = this.route.snapshot.data['feedbacks'];
    console.log(this.feedbacks);
    
  }

  convertISODateToRegularFormat(isoDate: any) {
    const dateObject = new Date(isoDate);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd');
  }
}
