import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IVolunteer, IVolunteerCreate } from '../models/volunteer.interface';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService implements Resolve<Array<IVolunteer>> {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getVolunteers(): Observable<Array<IVolunteer>> {
    let url = this.apiUrl + '/volunteer';
    return this._http.get<Array<IVolunteer>>(url);
  }

  updatePassword(email: string, passsword: string): Observable<Boolean> {
    let url = `${this.apiUrl}/volunteer/updatePassword/${email}/${passsword}`;
    return this._http.put<Boolean>(url, {});
  }

  createVolunteer(volunteer: IVolunteerCreate): Observable<any> {
    let url = this.apiUrl + '/volunteer';
    return this._http.post<any>(url, volunteer);
  }

  signIn(idNumber: string, passsword: string): Observable<IVolunteer> {
    let url = `${this.apiUrl}/volunteer/signIn/${idNumber}/${passsword}`;
    return this._http.get<IVolunteer>(url);
  }

  isVolunteerExistsByEmail(email: string) {
    let url = `${this.apiUrl}/volunteer/isVolunteerExistsByEmail/${email}`;
    return this._http.get<Boolean>(url);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IVolunteer>> {
    return this.getVolunteers();
  }

}
