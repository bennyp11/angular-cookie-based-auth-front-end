import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8080/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'    
    }),
    withCredentials: true //sets httpOnly to true and stores cookie, prevents XSS
  };

  constructor(private _http: HttpClient) {
  }

  getTypeRequest(url: any) {
    return this._http.get(`${this.baseUrl}${url}`, this.httpOptions).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: any, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload, this.httpOptions).pipe(map(res => {
      return res;
    }),
    catchError(error => {
      return of(error);
    })
    );
  }

  putTypeRequest(url: any, payload: any) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

}

/**
 * 
 * 
postTypeRequest(url: any, payload: any) {
  return this._http.post(`${this.baseUrl}${url}`, payload, this.httpOptions)
    .pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return of(error);
      })
    );
}
 */