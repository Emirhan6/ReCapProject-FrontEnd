import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn=false;
  apiUrl = 'https://localhost:44389/api/auth/';

  constructor(private httpClient:HttpClient) { }

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    this.loggedIn=true;
    this.setUserName(user.email);
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      user
    );
  }

  register(user: RegisterModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'register',
      user
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  setUserName(fullName: string) {
    localStorage.setItem('fullName', fullName);
  }

  getEmail(): string {
    return localStorage.getItem('fullName');
  }
}
