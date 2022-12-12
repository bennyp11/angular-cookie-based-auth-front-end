import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  sessionToken!: string;
  errorMessage: any;
  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.isUserLogin(); 
  }
  
  onSubmit(form: NgForm) {
   this._api.postTypeRequest('login', form.value).subscribe((res: any) => {
    if(res instanceof HttpErrorResponse && res.status === 401) alert('UNAUTHORIZED');
    else {
      const cookieValue = this.cookieService.get('session_token');
      const dirtyCookieObject = cookieValue.slice(2);
      const cleanCookieObject = JSON.parse(dirtyCookieObject);
      this._auth.setDataInLocalStorage("email", cleanCookieObject["email"]);
      this._auth.setDataInLocalStorage("session_token", cleanCookieObject["session_token"]);
      this._router.navigate(['welcome']);
    }
    })
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

  logout(){
    this._auth.clearStorage();
    this.isLogin = false;
    this._router.navigate(['']);
    this._api.getTypeRequest('logout').subscribe((res: any) => {

    })
  }
}


