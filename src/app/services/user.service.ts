import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44389/api/"

  constructor(private httpClient:HttpClient) { }

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/update';
    return this.httpClient.put<ResponseModel>(newPath, user);
  }
}
