import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';

export interface DialogData {
  freeActivity: IFreeActivity
}

@Component({
  selector: 'app-edit-free-activity-form',
  templateUrl: './edit-free-activity-form.component.html',
  styleUrls: ['./edit-free-activity-form.component.scss']
})
export class EditFreeActivityFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
