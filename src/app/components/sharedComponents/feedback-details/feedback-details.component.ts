import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  feedback: any
}

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss']
})
export class FeedbackDetailsComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
 private datePipe: DatePipe) {
  console.log(data.feedback);
  
 }

 convertISODateToRegularFormat(isoDate: any) {
  const dateObject = new Date(isoDate);
  return this.datePipe.transform(dateObject, 'yyyy-MM-dd');
}
}
