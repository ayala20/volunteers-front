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
  districtIds: string[] = [];
  categoryIds: string[] = [];
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
    if (this.districtIds.length == 0) return;
    this.step += 1;
    if (this.categoryIds.length == 0) {
      this.nextDisable = true;
    } else {
      this.nextDisable = false;
    }
  }

  toFinish() {
    if (this.categoryIds.length == 0) return;
    this.step += 1;
    this.nextDisable = true;
    this.FreeActivityService.filterFreeActivitiesByDistrictAndCategory(this.districtIds, this.categoryIds)
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
      if (this.districtIds.length != 0 && this.step == 1) {
        this.nextDisable = false;
      }
      if (this.categoryIds.length != 0 && this.step == 2) {
        this.nextDisable = false;
      }
    }
  }

  choosDistrict(districtId: string) {
    debugger
    if (districtId == '1') {
      this.districtIds = ['1']
      this.nextDisable = false;
      return
    } else {
      this.districtIds = this.districtIds.filter(id => id != '1')
    }
    let dis = this.districtIds.find(id => id == districtId)
    if (dis != undefined) {
      this.districtIds = this.districtIds.filter(d => d != districtId)
      if (this.districtIds.length == 0)
        this.nextDisable = true;
    }
    else {
      this.districtIds.push(districtId)
      this.nextDisable = false;
    }
  }

  choosCategory(categoryId: string) {
    if (categoryId == '1') {
      this.categoryIds = ['1']
      this.nextDisable = false;
      return
    } else {
      this.categoryIds = this.categoryIds.filter(id => id != '1')
    }
    let cat = this.categoryIds.find(id => id == categoryId)
    if (cat != undefined) {
      this.categoryIds = this.categoryIds.filter(c => c != categoryId)
      if (this.categoryIds.length == 0)
        this.nextDisable = true;
    }
    else {
      this.categoryIds.push(categoryId)
      this.nextDisable = false;
    }
  }

  openDialog(freeActivity: IFreeActivity) {
    this.dialog.open(FreeActivityDetailsComponent, {
      data: {
        freeActivity
      },
    });
  }

  isDistrictExists(districtId: string): boolean {
    let len = this.districtIds.filter(id => id == districtId).length
    if (len > 0) {
      return true
    }
    return false;
  }

  isCategoryExists(categoryId: string): boolean {
    let len = this.categoryIds.filter(id => id == categoryId).length
    if (len > 0) {
      return true
    }
    return false;
  }
}
