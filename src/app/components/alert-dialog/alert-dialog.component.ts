import { HtmlParser, HtmlTagDefinition } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  content: string,
  class: string,
  link: string,
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }
}
