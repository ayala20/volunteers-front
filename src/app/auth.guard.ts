import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { getFromLocalStorage } from './shared/storageUtils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

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
