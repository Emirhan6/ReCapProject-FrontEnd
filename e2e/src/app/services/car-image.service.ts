import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44389/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
 }

 getCarImagesById(carId: number): Observable<ListResponseModel<CarImage>> {
  return this.httpClient.get<ListResponseModel<CarImage>>(
    `${this.apiUrl}carimages/getimagesbycarid?id=${carId}`
  );
}

 getCarImageUrl(id: number): string {
  return `${this.apiUrl}carimages/getimagebyid?id=${id}`;
}
}