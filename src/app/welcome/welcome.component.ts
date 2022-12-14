import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    const tokenRefresh = () => {
      this._auth.refreshToken();  
      console.log('token has been refreshed');
    };
    setInterval(tokenRefresh, 11000);
  }

}
