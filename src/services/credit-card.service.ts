import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = "https://localhost:44389/api/"

  constructor(private httpClient:HttpClient) { }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'creditcards/add',creditCard
    );
  }

  getAllByUserId(userId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/getbyuserid?userId=' + userId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
}
