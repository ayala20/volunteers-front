import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IAssociation } from '../models/association.interface';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AssociationService implements Resolve<Array<IAssociation>>{
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getAssociation(): Observable<Array<IAssociation>> {
    let url = this.apiUrl + '/association';
    return this._http.get<Array<IAssociation>>(url);
  }

  createAssociation(association: IAssociation): Observable<any> {
    let url = this.apiUrl + '/association';
    return this._http.post<any>(url, association);
  }

  resolve(): Observable<Array<IAssociation>> {
    return this.getAssociation();
  }
}
