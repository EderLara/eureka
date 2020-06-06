import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Las cabeceras http de cliente y de la aplicacion. 
import { Observable } from 'rxjs'; // El iterador de objetos
import { GLOBAL } from './src.global';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public url: string;
  public headers;
  public role;
  public perfil;
  // Constructor del servicio:
  constructor(
    // En el constructor vamos a pasar los métodos aceptados por el protocolo http, los ponemos en una variable para que podamos invocarlos en las funciones siguientes:
    private _http: HttpClient
  ) { 
    // Dentro del constructor, pasamos la url de la api, puesto que es allí donde se ejecutan los controles:
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders().set('Content-Type','application/json');
   }
   // ----------------- Funciones de usuario.service:  ----------------- \\
   // Mostrar Usuarios:
   getUsers(page = null):Observable<any>{
    return this._http.get(this.url+'/users/'+ page, {headers: this.headers});
   }
   // Mostrar 1 usuario:
   findUser(dato):Observable<any>{
    return this._http.get(this.url+'/findUser/'+ dato, {headers: this.headers});
   }
   // Actualizar usuario:
   UpdateUser(id: String, user : Usuarios):Observable<any>{
     let params = JSON.stringify(user);
     return this._http.put(this.url+'/userudt/'+ id, params, {headers: this.headers});
   }
}
