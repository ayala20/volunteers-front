import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAssociation, IAssociationCreate } from 'src/app/models/association.interface';
import { AssociationService } from 'src/app/services/association.service';
import { saveToLocalStorage } from 'src/app/shared/storageUtils';
import { AlertDialogComponent } from '../../sharedComponents/alert-dialog/alert-dialog.component';
import { SignUpManagerComponent } from '../sign-up-manager/sign-up-manager.component';

@Component({
  selector: 'app-association-registration',
  templateUrl: './association-registration.component.html',
  styleUrls: ['./association-registration.component.scss'],
})
export class AssociationRegistrationComponent {
  registerationForm: FormGroup;
  selectedFile: File;
  selectedImage: File;
  error1: boolean = false;
  error2: boolean = false;
  close: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public associationService: AssociationService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<SignUpManagerComponent>
  ) {
    this.registerationForm = this.formBuilder.group({
      numberControl: new FormControl('', Validators.required),
      nameControl: new FormControl('', [Validators.required]),
      addressControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phoneControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{9,10}'),
      ]),
      fileControl: new FormControl('', [Validators.required]),
      logoImageControl: new FormControl('', [Validators.required]),
    });
  }

  changeFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.error1 = this.selectedFile == undefined;
  }

  changeImage(event: any) {
    this.selectedImage = event.target.files[0];
    this.error2 = this.selectedImage == undefined;
  }

  createAssociation() {
    this.error1 = this.selectedFile == undefined;
    this.error2 = this.selectedImage == undefined;
    if (!this.registerationForm.valid) return;

    let date = Date.now()

    const formDataFile = new FormData();
    let name1 = date + '.' + this.selectedFile.name.split('.').pop()
    formDataFile.append('file', this.selectedFile, name1);
    const formDataImage = new FormData();
    let name2 = date + '.' + this.selectedImage.name.split('.').pop()
    formDataImage.append('image', this.selectedImage, name2);

    const newAssociation: IAssociationCreate = {
      number: this.registerationForm.value.numberControl,
      name: this.registerationForm.value.nameControl,
      address: this.registerationForm.value.addressControl,
      email: this.registerationForm.value.emailControl,
      phone: this.registerationForm.value.phoneControl,
      file: name1,
      logo_image: name2,
    };

    this.associationService.uploadFile(formDataFile).subscribe((data) => {
      newAssociation.file = data;
    });

    this.associationService.uploadImage(formDataImage).subscribe((data) => {
      newAssociation.logo_image = data;
    });

    this.associationService
      .createAssociation(newAssociation)
      .subscribe(
        (data) => {
          this.router.navigate(['/signUpManager']);
          this.dialogRef.close();
          this.dialog.open(AlertDialogComponent, {
            data: {
              content: "בקשתך לפתיחת מערך התנדבות בארגון שלך התקבלה בהצלחה!" +
                "<br />" +
                "המתן לאישור המנהל עבור רישום מנהל אחראי התנדבות.",
              class: 'alert-success',
              link: '/logIn'
            }
          });
        },
        (error) => {
          this.openAlert(error.status)
        },
      );
  }

  openAlert(statusNumber: number) {
    let content = ""
    if (statusNumber == 409) {
      content = `אחד או יותר מהפרטים שהזנת קיימים אצלנו במערכת!` + "<br />" + "נסה שוב ליצור."
    }
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: content,
        class: 'alert-danger',
      }
    });
  }
}
