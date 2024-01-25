import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuComponent } from '../../sharedComponents/menu/menu.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { AssociationService } from 'src/app/services/association.service';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { IDistrict } from 'src/app/models/district.interface';
import { ICategory } from 'src/app/models/category.interface';
import { DistrictService } from 'src/app/services/district.service';
import { CategoryService } from 'src/app/services/category.service';
import { FreeActivityService } from 'src/app/services/free-activity.service';
import { IFreeActivityCreate } from 'src/app/models/freeActivity.interface';
import { dateNotPast } from 'src/app/validators/dateNotPast';

@Component({
  selector: 'app-adding-volunteering',
  templateUrl: './adding-volunteering.component.html',
  styleUrls: ['./adding-volunteering.component.scss']
})
export class AddingVolunteeringComponent {
  freeActivityForm: FormGroup;
  districts: Array<IDistrict> = [];
  categories: Array<ICategory> = [];
  user;

  constructor(
    private formBuilder: FormBuilder,
    public associationService: AssociationService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<MenuComponent>,
    private districtService: DistrictService,
    private categoryService: CategoryService,
    private freeActivityService: FreeActivityService,
  ) {
    this.user = getFromLocalStorage("user")
    this.getDistricts();
    this.getCategories();

    this.freeActivityForm = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      districtControl: new FormControl('', [Validators.required]),
      categoryControl: new FormControl('', [Validators.required]),
      addressControl: new FormControl('', [Validators.required]),
      dateAndTimeControl: new FormControl('', [Validators.required, dateNotPast()]),
      descriptionControl: new FormControl(''),
    });
  }

  getDistricts() {
    this.districtService.getDistricts().subscribe(data => {
      this.districts = data;
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }


  createFreeActivity() {
    if (!this.freeActivityForm.valid) return;
    const newFreeActivity: IFreeActivityCreate = {
      name: this.freeActivityForm.value.nameControl,
      address: this.freeActivityForm.value.addressControl,
      category: this.freeActivityForm.value.categoryControl,
      dateAndTime: this.freeActivityForm.value.dateAndTimeControl,
      description: this.freeActivityForm.value.descriptionControl,
      district: this.freeActivityForm.value.districtControl,
      manager: this.user.id,
    };


    this.freeActivityService
      .createFreeActivity(newFreeActivity)
      .subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: "בקשתך לפתיחת התנדבות בארגון שלך התקבלה בהצלחה!" +
              "<br />" +
              "אנו מאחלים לך שתמצא מהר את המתנדב המתאים.",
            class: 'alert-success',
            link: '/menu'
          }
        });
      });
  }
}
