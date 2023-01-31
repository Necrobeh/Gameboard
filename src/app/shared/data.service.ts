import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl : string = 'assets/data.json'

  constructor(public http : HttpClient) { }

  getData() : Observable<Menu[]> {
    return this.http.get<Menu[]>("assets/data.json");
  }
}
