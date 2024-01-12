import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './components/registrationComponents/log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpVolunteerComponent } from './components/registrationComponents/sign-up-volunteer/sign-up-volunteer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthGuard } from './auth.guard';
import { RequestComponent } from './components/volunteerComponents/request/request.component';
import { MenuComponent } from './components/sharedComponents/menu/menu.component';
import { VolunteerDetailsComponent } from './components/volunteerComponents/volunteer-details/volunteer-details.component';
import { FeedbackHistoriesComponent } from './components/volunteerComponents/feedback-histories/feedback-histories.component';
import { SignUpManagerComponent } from './components/registrationComponents/sign-up-manager/sign-up-manager.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AssociationRegistrationComponent } from './components/registrationComponents/association-registration/association-registration.component';
import { AlertDialogComponent } from './components/sharedComponents/alert-dialog/alert-dialog.component';
import { NewAssociationsComponent } from './components/managerComponents/new-associations/new-associations.component';
import { AssociationDetailsComponent } from './components/managerComponents/association-details/association-details.component';
import { StatusesComponent } from './components/managerComponents/statuses/statuses.component';
import { AddingVolunteeringComponent } from './components/responsibleComponents/adding-volunteering/adding-volunteering.component';
import { VolunteersForApprovalComponent } from './components/responsibleComponents/volunteers-for-approval/volunteers-for-approval.component';
import { FreeActivityDetailsComponent } from './components/volunteerComponents/free-activity-details/free-activity-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpVolunteerComponent,
    RequestComponent,
    MenuComponent,
    VolunteerDetailsComponent,
    FeedbackHistoriesComponent,
    SignUpManagerComponent,
    AssociationRegistrationComponent,
    AlertDialogComponent,
    NewAssociationsComponent,
    AssociationDetailsComponent,
    StatusesComponent,
    AddingVolunteeringComponent,
    VolunteersForApprovalComponent,
    FreeActivityDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
