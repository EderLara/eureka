import { Component, OnInit } from '@angular/core';
// Importamos librerias necesarias para la captura y enrutamiento de los datos del formulario:
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Importamos el modelo de registro de test:
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  // Variables de la clase Registro:
  public rol: boolean;
  public registroimg: string;
  public description: string;

  // Para capturar los datos del formulario:
  regUser: FormGroup;
  // Lista de datos para el uso de género:
  public sexos = [{
            code: "F",
            name: "Femenino"
          },{
            code: "M",
            name: "Masculino"
          }];
  // Variable del objeto del tipo del modelo:
  public userTest: Test;

  constructor(
    // Configuramos variables privadas para el acceso de router:
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Constructor de formulario para registro de usuario:
    this.regUser = new FormGroup({
      'identificacion': new FormControl(),
      'nombres': new FormControl(),
      'apellidos': new FormControl(),
      'imgPerfil': new FormControl(),
      'rolUser': new FormControl(),
      'genero': new FormControl(),
      'fechanace': new FormControl(),
      'email': new FormControl(),
      'passuser': new FormControl(),
      'estauser': new FormControl()
    });
    // Variables del constructor
    this.rol = false;
    this.registroimg = 'assets/media/img/dashboard.jpg';
    this.description = 'Eureka, es una Aplicación de prueba, usada para el semillero de investigación Sintaxis del SENA Regional Antioquia del centro de la manufactura avanzada CTMA';
    // Construimos la variable userTest que es un objeto de la clase Test:
    this.userTest = new Test("","","","","","","",0,"","","");
   }

  ngOnInit() {
  }
  // Funciones de registro:
  // regTest( regUser ){
  //   console.log(regUser);
  //   console.log('Probando la funcionalidad del boton');
  //   console.log("Valor", regUser.value);
  // }
}
