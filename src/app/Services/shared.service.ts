import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Property } from '../Models/property.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
public url = 'http://127.0.0.1/api/';
public folder = '../src/assets/images/';
//public url = 'http://www.maxpol.cf/api/';
//public folder = '../assets/images/';
public properties = new BehaviorSubject([]);
  constructor(public http: HttpClient) { }
  GetAllProperties() {
    const properties = [];
    this.http.request('get', this.url + 'properties.php').subscribe((response: any) => {
      response.forEach(element => {
        const property = { id: element.id, ...JSON.parse(element.data) } as Property;
        properties.push(property);
      });
    });
    this.properties.next(properties);
  }
}
