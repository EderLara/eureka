import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
// Interfaces:
import { Usuarios } from '../../interfaces/usuarios'
// Servicios
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {

  // Variables del componente:
  public titulo: string;
  public page: number;
  public nextpage;
  public prevpage;
  public status: string;
  public finder: boolean;
  // Variables con los valores de la base de datos:
  public total;
  public pages;
  public users: Usuarios[];
  public dato;

  constructor(
    private _ruta : ActivatedRoute,
    private _rutero: Router,
    private _ServiceUser : UsuariosService
  ) {
    this.titulo = 'Gestión de Usuarios';
    this.finder = false;
   }

  ngOnInit() {
    console.log('Componente de usuarios TS está cargado');
    this.actualpage();
  }

  // Función para capturar el número de página:
  actualpage(){
    this._ruta.params.subscribe(params =>{
      // Con esta variable capturamos de la url una "pagina", lo convertimos en entero al pasarle el "+":
      this.page = +params['page'];

      if (!params['page']) {
        this.page = 1
      }

      if (!this.page) {
        this.page = 1
      }else{

        this.nextpage = this.page+1;
        this.prevpage = this.page-1;
        // Condicionamos para que no se carguen valores negativos:
        if (this.prevpage <= 0) {
          this.prevpage = 1;    // Con esto garantizamos que no hayan errores de paginación
        }
      }
      console.log(this.page);
      // Devolver el listado de usuarios:
      this.getUsers(this.page);
    });
  }

  // Función para traer todos los usuarios:
  getUsers(page){
    this._ServiceUser.getUsers(page).subscribe(
      res =>{
        if (!res.users) {
          this.status = 'error de respuesta';
        } else {
          // Verificamos en la consola que el arreglo está llegando:
          console.log(res.users);
          this.total = res.total;
          this.pages = res.paginas;
          this.users = res.users;
          // Validamos la página con respecto a la pocision del path:
          if (page > this.pages) {
            // Si la pagina que ingreso es mayor a las que hay, me devuelve a la primera pag:
            this._rutero.navigate(['/usuarios',1]);
          }
        }
      },
      error =>{
        var MsjError = <any>error;
        console.log(MsjError);

        if (MsjError != null) {
          this.status = 'error';
        }
      }
    );
  }

  findUser(idU){
    this.dato = new this.users();

  }

}
