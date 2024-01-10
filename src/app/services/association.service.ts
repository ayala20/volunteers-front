import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IAssociation } from '../models/association.interface';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AssociationService implements Resolve<Array<IAssociation>> {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getAssociation(status: string): Observable<Array<IAssociation>> {
    let url = `${this.apiUrl}/association/${status}`;
    return this._http.get<Array<IAssociation>>(url);
  }

  createAssociation(association: IAssociation): Observable<any> {
    let pbj = {
      association: association,
    };
    let url = this.apiUrl + '/association';
    return this._http.post<any>(url, association);
  }

  uploadFile(formDataFile: FormData) {
    let url = this.apiUrl + '/association/uploadFile';
    return this._http.post<any>(url, formDataFile);
  }

  uploadImage(formDataImage: FormData) {
    let url = this.apiUrl + '/association/uploadImage';
    return this._http.post<any>(url, formDataImage);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IAssociation>> {
    let status = 'APPROVED'
    if (route.routeConfig?.path == 'signUpManager')
      status = 'APPROVED'
    else if (route.routeConfig?.path == 'newAssociationsForApproval')
      status = 'NEW'
    return this.getAssociation(status);
  }

  updateStatus(id: string, status: string) {
    let url = `${this.apiUrl}/association/${id}/${status}`;
    const options = { responseType: 'text' as 'text' }
    return this._http.put<String>(url, options);
  }

}
