import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IManager, IManagerCreate } from '../models/manager.interface';

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

  updatePassword(email: string, passsword: string): Observable<Boolean> {
    let url = `${this.apiUrl}/manager/updatePassword/${email}/${passsword}`;
    return this._http.put<Boolean>(url, {});
  }

  updateManager(id: string, user: any): Observable<any> {
    let url = `${this.apiUrl}/manager/updateManager/${id}`;
    return this._http.put<any>(url, user);
  }

  isCodeGood(email: string, passsword: string): Observable<Boolean> {
    let url = `${this.apiUrl}/manager/isCodeGood/${email}/${passsword}`;
    return this._http.get<Boolean>(url);
  }

  createManager(manager: IManagerCreate): Observable<any> {
    let url = this.apiUrl + '/manager';
    return this._http.post<any>(url, manager);
  }

  signIn(userName: string, passsword: string): Observable<IManager> {
    let url = `${this.apiUrl}/manager/signIn/${userName}/${passsword}`;
    return this._http.get<IManager>(url);
  }

  isManagerExistsByEmail(email: string) {
    let url = `${this.apiUrl}/manager/isManagerExistsByEmail/${email}`;
    return this._http.get<Boolean>(url);
  }
}
