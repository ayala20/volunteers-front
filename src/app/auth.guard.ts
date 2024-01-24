import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { getFromLocalStorage } from './shared/storageUtils';
import { UserService } from './services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public userService: UserService) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!getFromLocalStorage('user')) {
        this.router.navigate(['/logIn']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
