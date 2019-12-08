import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  public developer: string;
  public imgdev: string;
  public teamcode: string;
  constructor() {
    this.developer = 'Eder Lara Trujillo';
    this.imgdev = 'assets/media/img/Eder.jpeg';
    this.teamcode = 'assets/media/img/coder.jpg';
   }

  ngOnInit() {
  }

}
