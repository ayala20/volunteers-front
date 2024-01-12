import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IFreeActivity, IFreeActivityCreate } from '../models/freeActivity.interface';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

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

  findAllRequest(): Observable<Array<IFreeActivity>> {
    let url = `${this.apiUrl}/free-activity/findAllRequest`;
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

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IFreeActivity>> {
    if (route.routeConfig?.path == 'volunteersForApproval')
      return this.findAllRequest();
    return this.getFreeActivities();
  }

}
