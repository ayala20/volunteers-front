import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { getFromLocalStorage, removeFromLocalStorage } from './shared/storageUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userId: any = {};

  constructor(public spinnerService: SpinnerService) {
    debugger
    console.log(this.userId);
    this.userId = getFromLocalStorage("user")
    console.log(this.userId);

  }

  logOut() {
    removeFromLocalStorage("user")
    this.userId = getFromLocalStorage("user")
  }
  title = 'VolunteersFront';
}
