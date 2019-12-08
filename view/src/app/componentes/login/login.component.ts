import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public imglogin;
  public year = new Date();
  constructor() { 
    this.imglogin  = 'assets/media/img/developer.png';
  }

  ngOnInit() {
  }

}
