import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Las cabeceras http de cliente y de la aplicacion. 
import { Observable } from 'rxjs'; // El iterador de objetos
import { GLOBAL } from './src.global';

@Injectable({
  providedIn: 'root'
})
export class ZonaService{

  public url: string;
  public headers;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders().set('Content-Type','application/json');
   }
   /* ------------------------------- Funciones de Zonas Services ------------------------------- */
   getZonas():Observable<any>{
    return this._http.get(this.url+'/reportZona/', {headers: this.headers});
   }
}
