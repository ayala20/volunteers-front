import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/registrationComponents/log-in/log-in.component';
import { SignUpVolunteerComponent } from './components/registrationComponents/sign-up-volunteer/sign-up-volunteer.component';
import { AuthGuard } from './auth.guard';
import { RequestComponent } from './components/volunteerComponents/request/request.component';
import { MenuComponent } from './components/sharedComponents/menu/menu.component';
import { FeedbackHistoriesComponent } from './components/volunteerComponents/feedback-histories/feedback-histories.component';
import { DistrictService } from './services/district.service';
import { CategoryService } from './services/category.service';
import { SignUpManagerComponent } from './components/registrationComponents/sign-up-manager/sign-up-manager.component';
import { AssociationService } from './services/association.service';
import { NewAssociationsComponent } from './components/managerComponents/new-associations/new-associations.component';
import { VolunteersForApprovalComponent } from './components/responsibleComponents/volunteers-for-approval/volunteers-for-approval.component';
import { FreeActivityService } from './services/free-activity.service';
import { StatusesComponent } from './components/managerComponents/statuses/statuses.component';
import { ReportsOfAssociationsComponent } from './components/managerComponents/reports-of-associations/reports-of-associations.component';
import { ReportsOfVolunteersComponent } from './components/managerComponents/reports-of-volunteers/reports-of-volunteers.component';
import { ReadingFeedbackComponent } from './components/managerComponents/reading-feedback/reading-feedback.component';
import { FreeActivitiesCompletedComponent } from './components/responsibleComponents/free-activities-completed/free-activities-completed.component';
import { FreeActivitiesCurrentComponent } from './components/responsibleComponents/free-activities-current/free-activities-current.component';
import { FreeActivitiesStatusesComponent } from './components/responsibleComponents/free-activities-statuses/free-activities-statuses.component';
import { VolunteerFeedbackComponent } from './components/responsibleComponents/volunteer-feedback/volunteer-feedback.component';
import { MyFreeActivityDetailsComponent } from './components/volunteerComponents/my-free-activity-details/my-free-activity-details.component';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logIn', component: LogInComponent },
  { path: 'signUpVolunteer', component: SignUpVolunteerComponent },
  {
    path: 'signUpManager',
    component: SignUpManagerComponent,
    resolve: {
      associations: AssociationService,
    },
  },
  {
    path: 'request',
    component: RequestComponent,
    resolve: {
      districts: DistrictService,
      categories: CategoryService,
    },
  },
  {
    path: 'myFreeActivityDetails', component: MyFreeActivityDetailsComponent, resolve: {
      freeActivities: FreeActivityService,
    },
  },
  { path: 'feedbackHistories', component: FeedbackHistoriesComponent },
  {
    path: 'newAssociationsForApproval',
    component: NewAssociationsComponent,
    resolve: {
      associations: AssociationService,
    },
  },
  {
    path: 'volunteersForApproval',
    component: VolunteersForApprovalComponent,
    resolve: {
      freeActivities: FreeActivityService,
    },
  },
  {
    path: 'statuses', component: StatusesComponent, resolve: {
      associations: AssociationService,
    },
  },
  {
    path: 'reportsOfAssociations', component: ReportsOfAssociationsComponent, resolve: {
      associations: AssociationService,
    },
  },
  { path: 'reportsOfVolunteers', component: ReportsOfVolunteersComponent },
  { path: 'readingFeedback', component: ReadingFeedbackComponent },
  { path: 'freeActivitiesCompleted', component: FreeActivitiesCompletedComponent },
  { path: 'freeActivitiesCurrent', component: FreeActivitiesCurrentComponent },
  { path: 'freeActivitiesStatuses', component: FreeActivitiesStatusesComponent },
  { path: 'volunteerFeedback', component: VolunteerFeedbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
