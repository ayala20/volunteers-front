import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { getFromLocalStorage, removeFromLocalStorage } from 'src/app/shared/storageUtils';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent {
  myClass: string = 'menuDisplayed'

  constructor(public userService: UserService) {
    this.myClass = 'menuDisplayed'
  }

  getSignUser() {
    return getFromLocalStorage("user").roleUser;
  }

  isUserConnect() {
    const userRole = this.getSignUser()
    return userRole != undefined;
  }

  onClick() {
    if (this.myClass == 'menuDisplayed') {
      this.myClass = ''
    } else {
      this.myClass = 'menuDisplayed'
    }
  }

  logOut() {
    removeFromLocalStorage("user")
    this.userService.setUserConnect(false)
    this.myClass = ''
  }

}
