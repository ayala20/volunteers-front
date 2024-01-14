import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IFreeActivity, IFreeActivityCreate } from '../models/freeActivity.interface';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getFromLocalStorage } from '../shared/storageUtils';

@Injectable({
  providedIn: 'root'
})
export class FreeActivityService implements Resolve<Array<IFreeActivity>> {

  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getFreeActivities(): Observable<Array<IFreeActivity>> {
    let url = `${this.apiUrl}/free-activity`;
    return this._http.get<Array<IFreeActivity>>(url);
  }

  findAllRequestByManagerAndStatus(managerId: string, statuses: string[]): Observable<Array<IFreeActivity>> {
    let url = `${this.apiUrl}/free-activity/findAllRequestByManagerAndStatus/${managerId}/${statuses}`;
    return this._http.get<Array<IFreeActivity>>(url);
  }

  findAllRequestByVolunteerAndStatus(volunteerId: string, statuses: string[]): Observable<Array<IFreeActivity>> {
    let url = `${this.apiUrl}/free-activity/findAllRequestByVolunteerAndStatus/${volunteerId}/${statuses}`;
    return this._http.get<Array<IFreeActivity>>(url);
  }

  createFreeActivity(freeActivity: IFreeActivityCreate) {
    let url = this.apiUrl + '/free-activity';
    return this._http.post<any>(url, freeActivity);
  }

  filterFreeActivitiesByDistrictAndCategory(districtId: string, categoryId: string): Observable<Array<IFreeActivity>> {
    let url = `${this.apiUrl}/free-activity/${districtId}/${categoryId}`;
    return this._http.get<Array<IFreeActivity>>(url);
  }

  updateStatus(freeActivityId: string, volunteerId: string, status: string) {
    let url = `${this.apiUrl}/free-activity/${freeActivityId}/${volunteerId}/${status}`;
    return this._http.put<Array<IFreeActivity>>(url, {});
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IFreeActivity>> {
    if (route.routeConfig?.path == 'volunteersForApproval') {
      const managerId = getFromLocalStorage("user").id
      return this.findAllRequestByManagerAndStatus(managerId, ['REQUEST']);
    }
    if (route.routeConfig?.path == 'myFreeActivityDetails') {
      const volunteerId = getFromLocalStorage("user").id
      return this.findAllRequestByVolunteerAndStatus(volunteerId, ['APPROVED']);
    }
    return this.getFreeActivities();
  }

}
