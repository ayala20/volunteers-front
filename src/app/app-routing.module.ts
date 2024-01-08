import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { RequestComponent } from './components/request/request.component';
import { MenuComponent } from './components/menu/menu.component';
import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
import { FeedbackHistoriesComponent } from './components/feedback-histories/feedback-histories.component';
import { DistrictService } from './services/district.service';
import { CategoryService } from './services/category.service';
import { SignUpManagerComponent } from './components/sign-up-manager/sign-up-manager.component';
import { AssociationService } from './services/association.service';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logIn', component: LogInComponent },
  { path: 'signUpVolunteer', component: SignUpComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
