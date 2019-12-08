import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public rol: boolean;
  public registroimg: string;
  public description: string;
  constructor() {
    this.rol = false;
    this.registroimg = 'assets/media/img/dashboard.jpg';
    this.description = 'Eureka, es una Aplicación de prueba, usada para el semillero de investigación Sintaxis del SENA Regional Antioquia del centro de la manufactura avanzada CTMA';
   }

  ngOnInit() {
  }

}
