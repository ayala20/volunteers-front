import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../association-details/association-details.component';
import { StatusesComponent } from '../statuses/statuses.component';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-free-activities-in-association',
  templateUrl: './free-activities-in-association.component.html',
  styleUrls: ['./free-activities-in-association.component.scss']
})
export class FreeActivitiesInAssociationComponent {

  statuses = this.formBuilder.group({
    done: true,
    waiting: true,
    request: true,
    taken: true,
  });

  dataSource: any[] = [];
  filteredOptions: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<StatusesComponent>,
    private freeActivityService: FreeActivityService,
    private formBuilder: FormBuilder
  ) {
    this.findAllRequestByManagerAndStatus()
  }

  findAllRequestByManagerAndStatus() {
    this.freeActivityService.findAllFreeActivityByAssociation(this.data.association.id!)
      .subscribe(data => {
        this.dataSource = data
        this.filteredOptions = this.dataSource.sort((a, b) => new Date(a.dateAndTime).getDate()  - new Date(b.dateAndTime).getDate());
      })
  }

  myIncludes(sign: string) {
    let data = this.dataSource.filter(row => row.status.includes(sign));
    this.filteredOptions = this.filteredOptions.concat(data).sort((a, b) => new Date(a.dateAndTime).getDate()  - new Date(b.dateAndTime).getDate());
  }

  myNotIncludes(sign: string) {
    let data = this.filteredOptions.filter(row => !row.status.includes(sign));
    this.filteredOptions = data.sort((a, b) => new Date(a.dateAndTime).getDate()  - new Date(b.dateAndTime).getDate());
  }

  onDoneChange() {
    if (this.statuses.value.done) {
      this.myIncludes('DONE')
    } else {
      this.myNotIncludes('DONE');
    }
  }

  onWaitingChange() {
    let data = []
    if (this.statuses.value.waiting) {
      this.myIncludes('WAITING')
    } else {
      this.myNotIncludes('WAITING');
    }
  }

  onRequestChange() {
    let data = []
    if (this.statuses.value.request) {
      this.myIncludes('REQUEST')
    } else {
      this.myNotIncludes('REQUEST');
    }
  }

  onTatenChange() {
    let data = []
    if (this.statuses.value.taken) {
      this.myIncludes('TAKEN')
    } else {
      this.myNotIncludes('TAKEN');
    }
  }
}
