import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private spinnerVisible = false;

  show(): void {
    this.spinnerVisible = true;
  }

  hide(): void {
    this.spinnerVisible = false;
  }

  isVisible(): boolean {
    return this.spinnerVisible;
  }
}
