import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/Models/property.model';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/Services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  properties: Property[] = [];
  originalproperties: Property[] = [];
  location = '';
  category = '';
  room = '';
  locations: string[] = [];
  categories: string[] = [];
  rooms: string[] = [];
  constructor(public services: SharedService, public http: HttpClient) { }

  ngOnInit() {
    this.services.GetAllProperties();
    this.services.properties.subscribe((properties: Property[]) => {
      this.originalproperties = properties;
      this.properties = properties;
    });
    this.GetAllProperties();
  }
  GetAllProperties() {
    this.http.request('get', this.services.url + 'properties.php').subscribe((response: any) => {
      response.forEach(element => {
        const property = { id: element.id, ...JSON.parse(element.data) } as Property;
        if (!this.locations.includes(property.location)) { this.locations.push(property.location); }
        if (!this.categories.includes(property.category)) { this.categories.push(property.category); }
        if (!this.rooms.includes(property.rooms)) { this.rooms.push(property.rooms); }
      });
    });
  }
 Filter() {
   this.properties = this.originalproperties;
   if (this.location.trim() !== '') { this.properties = this.properties.filter(prop => prop.location === this.location); }
   if (this.room.trim() !== '') { this.properties = this.properties.filter(prop => prop.rooms === this.room); }
   if (this.category.trim() !== '') { this.properties = this.properties.filter(prop => prop.category === this.category); }
 }
 GetSrc(property: Property) {
   return 'assets/images/' + property.photos[0].name + '.' + property.photos[0].extension;
 }
}
