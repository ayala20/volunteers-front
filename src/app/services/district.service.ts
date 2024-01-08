import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IDistrict } from '../models/district.interface';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DistrictService implements Resolve<Array<IDistrict>> {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getDistricts(): Observable<Array<IDistrict>> {
    let url = this.apiUrl + '/District';
    return this._http.get<Array<IDistrict>>(url);
  }

  resolve(): Observable<Array<IDistrict>> {
    return  this.getDistricts();
  }
}
