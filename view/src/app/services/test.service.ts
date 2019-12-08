/* Este servicio lo usaremos para efectuar todas las actividades del crud: */
// Importamos las librerias necesarias para el adecuado manejo de los controles:
import { Injectable } from '@angular/core'; // importamo la Interfaz del nucleo de Angular,
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Las cabeceras http de cliente y de la aplicacion. 
import { Observable } from 'rxjs'; // El iterador de objetos
import { GLOBAL } from './apisrc';
import { Test } from '../models/test.model';

@Injectable()
// Clase para el inicio de sesión
export class LoginService{
    // Variables globales de la clase loginService:
    public url: string;
    public identidad;
    public token;
    
    // Constructor del servicio:
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }
    // Funciones 

    // Fin de la clase servicio
}

