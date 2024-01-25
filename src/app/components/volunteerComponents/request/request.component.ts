import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/category.interface';
import { IDistrict } from 'src/app/models/district.interface';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { FreeActivityDetailsComponent } from '../free-activity-details/free-activity-details.component';
import { environment } from 'src/environment/environment';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  fullName: string;
  step: number;
  districts: Array<IDistrict> = [];
  categories: Array<ICategory> = [];
  freeActivities: Array<IFreeActivity> = []
  districtId: string = "";
  categoryId: string = "";
  url: string = environment.url;
  nextDisable: boolean;

  constructor(
    private route: ActivatedRoute,
    private FreeActivityService: FreeActivityService,
    public dialog: MatDialog,
    private router: Router,
    public spinnerService: SpinnerService,
  ) {
    this.fullName = getFromLocalStorage('user').full_name;
    this.step = 1;
    this.nextDisable = true;
    this.districts = this.route.snapshot.data['districts'];
    this.categories = this.route.snapshot.data['categories'];
  }

  nextStep() {
    if (this.step == 1) {
      this.toCategory();
    } else {
      this.toFinish();
    }
  }

  toCategory() {
    if (this.districtId == "") return;
    this.step += 1;
    if (this.categoryId == "") {
      this.nextDisable = true;
    } else {
      this.nextDisable = false;
    }
  }

  toFinish() {
    if (this.categoryId == "") return;
    this.step += 1;
    this.nextDisable = true;
    this.FreeActivityService.filterFreeActivitiesByDistrictAndCategory(this.districtId, this.categoryId)
      .subscribe(data => {
        this.freeActivities = data
        console.log(this.freeActivities);
      })
  }

  prevStep() {
    if (this.step == 1) {
      this.router.navigate(['/menu']);
    } else {
      this.step -= 1;
      if (this.districtId != "" && this.step == 1) {
        this.nextDisable = false;
      }
      if (this.categoryId != "" && this.step == 2) {
        this.nextDisable = false;
      }
    }
  }

  choosDistrict(districtId: string) {
    this.districtId = districtId
    this.nextDisable = false;
  }

  choosCategory(categoryId: string) {
    this.categoryId = categoryId
    this.nextDisable = false;
  }

  openDialog(freeActivity: IFreeActivity) {
    console.log(freeActivity);

    this.dialog.open(FreeActivityDetailsComponent, {
      data: {
        freeActivity
      },
    });
  }
}
