import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IAssociation } from '../models/association.interface';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AssociationService implements Resolve<Array<IAssociation>> {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getAssociation(is_approved: boolean): Observable<Array<IAssociation>> {
    let url = `${this.apiUrl}/association/${is_approved}`;
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

  resolve(): Observable<Array<IAssociation>> {
    return this.getAssociation(false);
  }
}
