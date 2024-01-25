import { Injectable } from '@angular/core';
import { getFromLocalStorage } from '../shared/storageUtils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isUserConnect: boolean;
  private nameUser: string;

  constructor() {
    let user = getFromLocalStorage("user")
    let connect = user != null
    this.setUserConnect(connect)
  }

  setUserConnect(isConnect: boolean): void {
    this.isUserConnect = isConnect;
    if (isConnect) {
      let user = getFromLocalStorage("user")
      let roleUser = user.roleUser
      if (roleUser == 1) {
        this.nameUser = user.full_name
      } else if (roleUser == 2) {
        this.nameUser = user.name
      }
    }
  }

  getName(): string {
    return this.nameUser;
  }
}
