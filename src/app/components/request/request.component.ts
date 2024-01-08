import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category.interface';
import { IDistrict } from 'src/app/models/district.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DistrictService } from 'src/app/services/district.service';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  fullName: string;
  step: number;
  districts: Array<IDistrict> = [];
  categories: Array<ICategory> = []

  constructor(
    private route: ActivatedRoute
  ) {
    this.fullName = getFromLocalStorage('user').full_name;
    this.step = 1;
    this.districts = this.route.snapshot.data['districts'];
    this.categories = this.route.snapshot.data['categories'];
  }

  nextStep() {
    this.step += 1;
  }
}
