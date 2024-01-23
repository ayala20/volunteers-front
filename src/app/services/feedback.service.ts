import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IFeedBack, IFeedBackCreate } from '../models/feedback.interface';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getFromLocalStorage } from '../shared/storageUtils';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements Resolve<Array<IFeedBack>> {

  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getFeedBacks(): Observable<Array<IFeedBack>> {
    let url = this.apiUrl + '/FeedBack';
    return this._http.get<Array<IFeedBack>>(url);
  }

  getFeedbackByVolunteerId(): Observable<Array<any>> {
    const volunteerId = getFromLocalStorage("user").id
    let url = `${this.apiUrl}/FeedBack/getFeedbackByVolunteerId/${volunteerId}`;
    return this._http.get<Array<any>>(url);
  }

  getFeedbackByManagerId(): Observable<Array<any>> {
    const managerId = getFromLocalStorage("user").id
    debugger;
    let url = `${this.apiUrl}/FeedBack/getFeedbackByManagerId/${managerId}`;
    return this._http.get<Array<any>>(url);
  }

  createFeedBack(feedback: IFeedBackCreate) {
    let url = `${this.apiUrl}/FeedBack`;
    return this._http.post<Array<IFeedBack>>(url, feedback);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IFeedBack>> {
    if (route.routeConfig?.path == 'volunteerFeedback') { // for responsible
      return this.getFeedbackByManagerId();
    }
    if (route.routeConfig?.path == 'readingFeedback') { // for manager
      return this.getFeedBacks();
    }
    return this.getFeedbackByVolunteerId();
  }
}
