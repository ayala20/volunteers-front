import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IVolunteer, IVolunteerCreate } from '../models/volunteer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getVolunteers(): Observable<Array<IVolunteer>> {
    let url = this.apiUrl + '/volunteer';
    return this._http.get<Array<IVolunteer>>(url);
  }

  createVolunteer(volunteer: IVolunteerCreate): Observable<any> {
    let url = this.apiUrl + '/volunteer';
    return this._http.post<any>(url, volunteer);
  }

  signIn(idNumber: string, passsword: string): Observable<IVolunteer> {
    let url = `${this.apiUrl}/volunteer/signIn/${idNumber}/${passsword}`;
    return this._http.get<IVolunteer>(url);
  }
}
