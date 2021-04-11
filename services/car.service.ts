import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetails';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44389/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  add(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  getCarGetById(carId: number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getdetailbyid?carId="+carId;
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
      let newPath = this.apiUrl + 'carimages/getbycar?=carId'+carId;
      return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
    }

  getCarsDetailsByCar(
      carId: number
    ): Observable<ListResponseModel<CarDetails>> {
      let newPath = this.apiUrl + 'cars/getdetailbyid?carId=' + carId;
      return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
    }
  getCarsDetails(): Observable<ListResponseModel<CarDetails>> {
      let newPath = this.apiUrl + 'cars/getdetailall';
      return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
    }
  
    getCarById(id: number): Observable<SingleResponseModel<Car>> {
      let newPath = this.apiUrl + 'cars/getbyid?id=' + id;
      return this.httpClient.get<SingleResponseModel<Car>>(newPath);
    }
}
