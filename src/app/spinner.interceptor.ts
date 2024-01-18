import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from './services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // הפעלת הספינר לפני שנשלח את הבקשה
    this.spinnerService.show();
    return next.handle(request).pipe(
      // סיום וכיבוי הספינר לאחר קבלת תשובה
      finalize(() => this.spinnerService.hide())
    );
  }
}