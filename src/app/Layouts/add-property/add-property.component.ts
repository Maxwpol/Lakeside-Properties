import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/Models/property.model';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/Services/shared.service';
import * as moment from 'moment';
import { Photo } from 'src/app/Models/photo.model';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  property: Property;
  properties: Property[];
  photostodelete: Photo[] = [];
  constructor(public services: SharedService, public http: HttpClient) { }

  ngOnInit() {
    this.GetAllProperties();
    this.ResetForm();
  }
  ResetForm() {
    const date = moment().format('YYYY-MM-DD');
    this.property = new Property(null, '', '', '', '', '', '', [], date);
    this.photostodelete = [];
  }
  GetAllProperties() {
    this.properties = [];
    this.http.request('get', this.services.url + 'properties.php').subscribe((response: any) => {
      response.forEach(element => {
        const property = { id: element.id, ...JSON.parse(element.data) } as Property;
        this.properties.push(property);
      });
    });
  }

  OnSelectedFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.property.photos.push(new Photo(null, '', reader.result.toString(), '', this.services.folder));
      };
    }
    console.log(this.property);
  }
  DeletePropPhoto(photo) {
    this.property.photos = this.property.photos.filter(pht => pht !== photo);
  }
  OnSubmit() {
    const data = this.property;
    const id = data.id;
    const photos: Photo[] = [];
    const date = moment().format('YYYYMMDDhhmmss');
    let count = 1;
    data.photos.forEach(photo => {
      if (photo.photo !== null) {
        const ext = photo.photo.split(';base64,')[0].split('/')[1];
        const name = date + '-' + count;
        const  phot = photo.photo;
        photos.push(new Photo(null, name, phot, ext, photo.folder));
        count++;
        photo.name = name;
        photo.extension = ext;
        photo.photo = null;
      }
     });
    if (id == null) {
      delete data.id;
      this.http
        .request('post', this.services.url + 'properties.php', { body: data })
        .subscribe((response: any) => {
          if (response.Message === 'Success') {
               this.PostPhotos(photos).subscribe(res => console.log(res));
               this.GetAllProperties();
               this.ResetForm();
          }
        });
    } else {
      this.http
        .request('put', this.services.url + 'properties.php', { body: data })
        .subscribe((response: any) => {
          if (response.Message === 'Success') {
            this.DeletePhotos(this.photostodelete).subscribe(res => console.log(res));
            this.PostPhotos(photos).subscribe(res => console.log(res));
            this.GetAllProperties();
            this.ResetForm();
          }
        });
    }
  }
  GetPhoto(name) {
    return   this.http.get('assets/images/' + name, { responseType: 'blob' });
   }
  PostPhotos(photos: Photo[]) {
    return this.http.request('post', this.services.url + 'photos.php', { body: photos});
}
DeletePhotos(photos: Photo[]): any {
return this.http.request('delete', this.services.url + 'photos.php', { body: photos});
}
  OnEdit(property) {
    this.photostodelete = [];
    property.photos.forEach((photo) => {
      this.photostodelete.push(photo);
      this.GetPhoto(photo.name + '.' + photo.extension).subscribe((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (event) => {
          photo.photo = (reader.result.toString());
        };
      });
    }
    );
    this.property = property;
  }
  OnDelete(property) {
    if (confirm('Are you sure to delete ')) {
      this.http
        .request('delete', this.services.url + 'entries.php', { body: property })
        .subscribe((response: any) => {
          if (response.Message === 'Success') {
            this.GetAllProperties();
            this.ResetForm();
          }
        });
    }
  }
}
