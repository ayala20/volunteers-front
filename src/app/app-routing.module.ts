import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
// import { RequestComponent } from './components/request/request.component';
// import { MenuComponent } from './components/menu/menu.component';
// import { VolunteerDetailsComponent } from './components/volunteer-details/volunteer-details.component';
// import { FeedbackHistoriesComponent } from './components/feedback-histories/feedback-histories.component';
// import { DistrictService } from './services/district.service';
// import { CategoryService } from './services/category.service';

const routes: Routes = [
  { path: '', component: SignUpComponent, canActivate: [AuthGuard] },
  {
    path: 'menu',
    component: SignUpComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logIn', component: LogInComponent },
  { path: 'signUp', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
