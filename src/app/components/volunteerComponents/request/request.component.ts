import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category.interface';
import { IDistrict } from 'src/app/models/district.interface';
import { IFreeActivity } from 'src/app/models/freeActivity.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DistrictService } from 'src/app/services/district.service';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { FreeActivityDetailsComponent } from '../free-activity-details/free-activity-details.component';
import { environment } from 'src/environment/environment';

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
  districtId: string;
  categoryId: string;
  url: string = environment.url;

  constructor(
    private route: ActivatedRoute,
    private FreeActivityService: FreeActivityService,
    public dialog: MatDialog,
  ) {
    this.fullName = getFromLocalStorage('user').full_name;
    this.step = 1;
    this.districts = this.route.snapshot.data['districts'];
    this.categories = this.route.snapshot.data['categories'];
  }

  nextStep() {
    this.step += 1;

    if (this.step == 3) {
      this.FreeActivityService.filterFreeActivitiesByDistrictAndCategory(this.districtId, this.categoryId)
      .subscribe(data => {
        this.freeActivities = data
        console.log(this.freeActivities); 
      })
    }
  }

  choosDistrict(districtId: string) {
    this.districtId = districtId
  }

  choosCategory(categoryId: string) {
    this.categoryId = categoryId
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
