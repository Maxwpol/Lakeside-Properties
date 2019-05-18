import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/Models/property.model';
import { SharedService } from 'src/app/Services/shared.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Photo } from 'src/app/Models/photo.model';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(public services: SharedService, public http: HttpClient) { }

  property: Property;
  properties: Property[];
  pht = 'assets/images/1-1.png';

  ngOnInit() {
    this.ResetForm();
  }
  ResetForm() {
    const date = moment().format('YYYY-MM-DD');
    this.property = new Property(null, '', '', '', '', '', '', [], date);
  }
  OnSelectedFile(event) {
    this.property.photos = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // const blob = new File([event.target.files[0]], 'max.png');
      // console.log(blob);
      reader.onload = (event) => {
        this.property.photos.push(new Photo(null,'',reader.result.toString(),'',this.services.folder));
      };
    }
  }
  GetPhoto(name) {
   return   this.http.get('assets/images/' + name,{ responseType: 'blob' });
  }
  async Post() {
    // this.GetPhoto('1-1.png').subscribe((res) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(res);
    //   reader.onload = (event) => {
    //   console.log(event.target.result);
    //   }
    // });
    // let url = this.GetPhoto('1-1.png');
    // console.log(url);
    const photos: Photo[] = [];
    const data = this.property;
    const date = moment().format('YYYYMMDDhhmmss');
    console.log(date);
    let count = 1;
    data.photos.forEach(photo => {
       const ext = photo.photo.split(';base64,')[0].split('/')[1];
       const name = date + '-' + count;
       const  phot = photo.photo;
       photos.push(new Photo(null, name, phot, ext,photo.folder));
       count++;
      // photo .photo= name + '.' + ext;

     });
    this.PostPhotos(photos).subscribe((res) => console.log(res));
   // console.log(photos);

    // const photos2: Photo[] = [];
    // photos2.push(new Photo(null, '20190515075541-1', '', 'png','images/'));
    // this.DeletePhotos(photos2).subscribe((res) => console.log(res));

  }
  PostPhotos(photos:Photo[]){
           return this.http.request('post', this.services.url + 'photos.php', { body: photos});
  }
  DeletePhotos(photos:Photo[]):any{
   return this.http.request('delete', this.services.url + 'photos.php', { body: photos});
  }
}
