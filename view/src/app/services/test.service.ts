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
        // En el constructor vamos a pasar los métodos aceptados por el protocolo http, los ponemos en una variable para que podamos invocarlos en las funciones siguientes:
        public _http: HttpClient
    ){
        // Dentro del constructor, pasamos la url de la api, puesto que es allí donde se ejecutan los controles:
        this.url = GLOBAL.url;
    }
    // ----------------- Funciones de test.service:  ----------------- \\

    // Función de registro de Test:
    registro(usertest: Test): Observable<any>{
        // Observamos que objeto se ha obtenido del fomulario:
        console.log(usertest);
        // Convertimos en un objeto JSON los datos del formulario:
        let params = JSON.stringify(usertest);
        // Pasamos las cabeceras de la vista:
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        // Pasamos a la ruta del registro del usertest:
        return this._http.post(this.url+'/registro', params, {headers:headers})
    }
    // ----------------------------------------- \\
    // Funcion de ingreso, login:
    ingreso(usertest, gettoken = null): Observable<any>{
        // Comprobaremos que el token sea válido:
        if(gettoken != null){
            // Recogemos el parámetro gettoken del inicio de sesión:
            usertest.gettoken = gettoken;
        }
        // Capturamos los datos del formulario:
        let params = JSON.stringify(usertest);
        // Le pasamos las cabeceras al servicio http:
        let headers = new HttpHeaders().set('Content-Type','application/json');
        // Retornamos al control los datos obtenidos y esperamos la respuesta:
        return this._http.post(this.url+'/login', params, {headers:headers});
    }
    // ----------------------------------------- \\
    //Funcion para el ingreso del usuario logueado:
    getIdentidad(){
        // Variable para traer los datos del usuario, para el ejercicio lo llamo identidad:
        let identidad = JSON.parse(localStorage.getItem('identidad'));
        // Validamos esta identidad:
        if (identidad != undefined) {
            // Si existen datos dentro de este objeto identidad, se los paso a la variable:
            this.identidad = identidad;
            // Veamos el objeto:
            console.log(this.identidad);
        } else {
            // De lo contrario anulamos la identidad:
            this.identidad = null;
        }
        // Retornamos el resultado de identidad:
        return this.identidad;
    }
    // ----------------------------------------- \\
    // Función para identificar al usuario logueado:
    getToken(){
        // Variable para obtener el token del usuario logueado desde el navegador:
        let token = localStorage.getItem('token');
        // Validaremos este token para poder administrar la sesión:
        if (token != undefined) {
            // Si el token esta definido, entonces lo usamos como bandera:
            this.token = token;
            // Podemos observarlo en consola del navegador:
            console.log(this.token);
        }else{
            this.token = null;
        }
        // Retornamos el token del usuario:
        return this.token;
    }
    // ----------------------------------------- \\

    // ----------------- Fin Funciones de test.service:  ----------------- \\
}

