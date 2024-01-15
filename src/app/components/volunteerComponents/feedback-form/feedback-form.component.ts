import { Component } from '@angular/core';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {

  fullName: string;


  constructor() {
    this.fullName = getFromLocalStorage('user').full_name;
  }
}
