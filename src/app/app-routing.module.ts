import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/registrationComponents/log-in/log-in.component';
import { SignUpVolunteerComponent } from './components/registrationComponents/sign-up-volunteer/sign-up-volunteer.component';
import { AuthGuard } from './auth.guard';
import { RequestComponent } from './components/volunteerComponents/request/request.component';
import { MenuComponent } from './components/sharedComponents/menu/menu.component';
import { VolunteerDetailsComponent } from './components/volunteerComponents/volunteer-details/volunteer-details.component';
import { FeedbackHistoriesComponent } from './components/volunteerComponents/feedback-histories/feedback-histories.component';
import { DistrictService } from './services/district.service';
import { CategoryService } from './services/category.service';
import { SignUpManagerComponent } from './components/registrationComponents/sign-up-manager/sign-up-manager.component';
import { AssociationService } from './services/association.service';
import { NewAssociationsComponent } from './components/managerComponents/new-associations/new-associations.component';
import { VolunteersForApprovalComponent } from './components/responsibleComponents/volunteers-for-approval/volunteers-for-approval.component';
import { FreeActivityService } from './services/free-activity.service';

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
  { path: 'volunteerDetails', component: VolunteerDetailsComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
