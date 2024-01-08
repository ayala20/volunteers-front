import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.interface';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements Resolve<Array<ICategory>> {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getCategories(): Observable<Array<ICategory>> {
    let url = this.apiUrl + '/category';
    return this._http.get<Array<ICategory>>(url);
  }

  resolve(): Observable<Array<ICategory>> {
    return  this.getCategories();
  }
}
