import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IFeedBack } from '../models/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getDistricts(): Observable<Array<IFeedBack>> {
    let url = this.apiUrl + '/FeedBack';
    return this._http.get<Array<IFeedBack>>(url);
  }
}
