import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IManager } from '../models/manager.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getManagers(): Observable<Array<IManager>> {
    let url = this.apiUrl + '/manager';
    return this._http.get<Array<IManager>>(url);
  }

  createManager(manager: IManager): Observable<any> {
    let url = this.apiUrl + '/manager';
    return this._http.post<any>(url, manager);
  }

  signIn(userName: string, passsword: string): Observable<IManager> {
    let url = `${this.apiUrl}/manager/signIn/${userName}/${passsword}`;
    return this._http.get<IManager>(url);
  }
}
