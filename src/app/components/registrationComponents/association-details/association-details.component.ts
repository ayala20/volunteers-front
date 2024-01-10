import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IAssociation } from 'src/app/models/association.interface';
import { environment } from 'src/environment/environment';
import { NewAssociationsComponent } from '../../managerComponents/new-associations/new-associations.component';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { AssociationService } from 'src/app/services/association.service';

export interface DialogData {
  association: IAssociation
}

@Component({
  selector: 'app-association-details',
  templateUrl: './association-details.component.html',
  styleUrls: ['./association-details.component.scss']
})
export class AssociationDetailsComponent {
  url: string = environment.url;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<NewAssociationsComponent>,
    private associationService: AssociationService
  ) {
    console.log(this.url + '/images/' + data.association.logo_image);
  }

  onApproved() {
    debugger
    this.associationService.updateStatus(this.data.association.id!, "APPROVED").subscribe(data => {
      debugger
      console.log(data);

      this.dialogRef.close()
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: `אישרת בהצלחה את פתיחת מערך התנדבות בעמותה ${this.data.association.name}!` +
            "<br />" +
            "הודעה על כך תישלח למייל של העמותה, בצרוף סיסמה להזהות האחראים.",
          class: 'alert-success',
          link: '/menu'
        }
      });
    })
  }

  onCancel() {
    this.associationService.updateStatus(this.data.association.id!, "FAILED").subscribe(data => {
      this.dialogRef.close()
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: `פתיחת מערך התנדבות בעמותה ${this.data.association.name} לא אושרה!` +
            "<br />" +
            "הודעה על כך תישלח למייל של העמותה.",
          class: 'alert-success',
          link: '/menu'
        }
      });
    })
  }
}
