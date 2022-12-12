import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _api: ApiService ,
    private cookieService: CookieService
  ) { }
  
   getUserDetails() {
    if(localStorage.getItem('session_token')){
      return localStorage.getItem('session_token');
    }else{
      return null;
    }
  }

  setDataInLocalStorage(variableName: any, data: any) {
      localStorage.setItem(variableName, data);
  }

  getToken() {
      return localStorage.getItem('session_token');
  }

  refreshToken() {
    this._api.postTypeRequest('refresh', null).subscribe((res: any) => {
      const cookieValue = this.cookieService.get('session_token');
      const dirtyCookieObject = cookieValue.slice(2);
      const cleanCookieObject = JSON.parse(dirtyCookieObject);
      this.setDataInLocalStorage("email", cleanCookieObject["email"]);
      this.setDataInLocalStorage("session_token", cleanCookieObject["session_token"]);
    })
  }

  clearStorage() {
      localStorage.clear();
  }
}