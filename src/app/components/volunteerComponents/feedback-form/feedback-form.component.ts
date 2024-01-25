import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IFeedBackCreate } from 'src/app/models/feedback.interface';
import { FeedbackService } from 'src/app/services/feedback.service';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {

  idFreeActivity: string;
  feedbackForm: FormGroup;
  fullName: string;
  currentRate = 0;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.fullName = getFromLocalStorage('user').full_name;
    this.feedbackForm = this.formBuilder.group({
      noteControl: new FormControl('', [Validators.required]),
    })
    this.idFreeActivity = route.snapshot.paramMap.get('id')!
  }

  createFeedback() {
    if (!this.feedbackForm.valid) return;
    const newFeedBack: IFeedBackCreate = {
      date: new Date(),
      rating: this.currentRate,
      note: this.feedbackForm.value.noteControl,
      idFreeActivity: this.idFreeActivity,
    };
    this.feedbackService.createFeedBack(newFeedBack).subscribe(data => {
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: "תודה רבה על המשוב!",
          class: 'alert-success',
          link: '/menu'
        }
      });
    });
  }

}
