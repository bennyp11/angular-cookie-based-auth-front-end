import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(
    private _auth: AuthService,
    private _router:Router,
    private _api: ApiService, 
  ) { }

  ngOnInit(): void {
    if(!this._auth.getToken()){
      this.isLogin = false;
    }if(this._auth.getToken()){
      this.isLogin = true;
    }
  }

  logout(){
    this._auth.clearStorage();
    this.isLogin = false;
    this._router.navigate(['']);
    this._api.getTypeRequest('logout').subscribe((res: any) => {
    })
    location.reload();

  }

}
