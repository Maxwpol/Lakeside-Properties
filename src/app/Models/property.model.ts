import { Photo } from './photo.model';

export class Property {
  constructor(
    public id: string,
    public title: string,
    public category: string,
    public description: string,
    public rooms: string,
    public price: string,
    public location: string,
    public photos: Photo[],
    public date: string,
  )
  {}
}
